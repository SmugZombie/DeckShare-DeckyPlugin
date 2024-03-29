#!/usr/bin/env python
import os
import sys
sys.path.append(os.path.dirname(__file__))
sys.path.append(os.path.join(os.path.dirname(__file__), 'steampy'))
import ssl
import vdf
import http.client
import mimetypes
import base64
import socket
import time
from py_backend.instanceManager import InstanceManager
from py_backend.jsInterop import JsInteropManager
from settings import SettingsManager
from py_backend.logger import log, debuglog
from pathlib import Path

Initialized = False

class Plugin:
  log(f"Plugin loaded. User: {os.environ['DECKY_USER']}")
  pluginUser = os.environ["DECKY_USER"]
  pluginSettingsDir = os.environ["DECKY_PLUGIN_SETTINGS_DIR"]
  pluginDirPath = os.path.dirname(__file__)
  guidesDirPath = f"/home/{pluginUser}/homebrew/plugins/deckshare-plugin/guides"
  parentDirPath = Path(pluginDirPath).parent
  homebrewDirPath = f"/home/{pluginUser}/homebrew"
  settingsManager = SettingsManager(name='DeckShare', settings_directory=pluginSettingsDir)
  steamdir = "/home/deck/.local/share/Steam/"
  version = "0.2.0beta"
  discordWebhookURLBase = "https://discord.com/api/webhooks/"
  debug = False

  # Validates the Webhook URL by sending a GET request to the URL and checking the status code of the response
  async def validateWebhookUrl(self, webhookUrl):
    try:
      log("Checking Webhook URL:" + webhookUrl)
      if(webhookUrl == "" or webhookUrl == False or webhookUrl == "https://discord.com/api/webhooks/"):
        log("No Valid Webhook URL Found")
        return False
      
      # Separate the host and the path of the URL
      from urllib.parse import urlparse
      parsed_url = urlparse(webhookUrl)
      host = parsed_url.netloc
      path = parsed_url.path

      # Create an unverified SSL context
      context = ssl._create_unverified_context()

      # Send the POST request
      conn = http.client.HTTPSConnection(host, context=context)
      conn.request('GET', path, "", {})
      response = conn.getresponse()

      # Check the status code of the response for success or failure
      if response.status == 200:
        log(f"Successfully validated Webhook URL")
        return True
      else:
        log(f"Failed to validate Webhook URL {webhookUrl} {response.status}")
      return False
    except Exception as e:
      log(f"An error occurred: {e}")
      return False

  # Get the Webhook URL from the settings
  async def getWebhookUrl(self):
    try:
      self.discordWebhookURL = str(await self.getSetting(self, 'discordWebhook', ''))
      if(self.discordWebhookURL == ""):
        self.discordWebhookURL = self.discordWebhookURLBase
      #log("Storage Discord Webhook: " + self.discordWebhookURL)
      return self.discordWebhookURL
    except Exception as e:
      log(f"An error occurred: {e}")
      return False
      
  # Set the Webhook URL in the settings
  async def setWebhookUrl(self, webhookUrl):
    try:
      if(await self.validateWebhookUrl(self, webhookUrl) == False):
        log("Invalid Webhook URL")
        return "Invalid Webhook URL"
      self.discordWebhookURL = webhookUrl
      #log("Setting Discord Webhook: " + self.discordWebhookURL)
      await self.setSetting(self, 'discordWebhook', webhookUrl)
      return self.discordWebhookURL
    except Exception as e:
      log(f"An error occurred: {e}")
      return False

  # Get the Steam ID of the current logged in user
  def GetSteamId(self):
    d = vdf.parse(open("{0}config/loginusers.vdf".format(self.steamdir), encoding="utf-8"))
    users = d['users']
    for id64 in users:
      if users[id64]["MostRecent"] == "1":
        user = int(id64)
        return user
  
  # Retrieves a stored setting from the settings file
  async def getSetting(self, key, defaultVal):
    return self.settingsManager.getSetting(key, defaultVal)

  # Stores a setting in the settings file
  async def setSetting(self, key, newVal):
    self.settingsManager.setSetting(key, newVal)
    log(f"Set setting {key} to {newVal}")
    pass

  # Retrieves the home directory of the plugin
  async def getHomeDir(self):
    return self.pluginUser

  async def logMessage(self, message):
    log(message)

  # Asyncio-compatible long-running code, executed in a task when the plugin is loaded
  async def _main(self):
    global Initialized
    if Initialized:
      return
    
    Initialized = True

    log("Initializing DeckShare Plugin")

    self.settingsManager.read()
    self.settingsManager.setSetting("version", self.version)

    if "webSocketPort" not in self.settingsManager.settings:
      log("No WebSocket port detected in settings.")
      self.settingsManager.setSetting("webSocketPort", "5050")
      self.settingsManager.setSetting("debug", False)
      log("Set WebSocket port to default; \"5050\"")
    else:
      log(f"WebSocket port loaded from settings. Port: {self.settingsManager.getSetting('webSocketPort', '')}")
      
    self.jsInteropManager = JsInteropManager("localhost", self.settingsManager.getSetting("webSocketPort", "5050"))
    self.instanceManager = InstanceManager(0.25, self.jsInteropManager)

    #* start websocket server
    self.jsInteropManager.startServer()

  async def _unload(self):
    self.jsInteropManager.stopServer()
    log("Plugin unloaded")
    pass

  # Get the latest screenshots from the Steam screenshots directory limited to the newest 5 that are not thumbnails
  async def getScreenshots(self, size=12):
    screenshots = {}
    user = self.GetSteamId(self)
    url = "{0}userdata/{1}/760/remote/".format(self.steamdir, user & 0xFFFFFFFF)

    for root, dirs, files in os.walk(url):
      if "thumbnails" not in root:
        for file in files:
          if file.endswith(".jpg"):
            screenshots[file] = {'path': os.path.join(root, file), 'name': file, 'id': file }

    # Convert the dictionary to a list of tuples and sort it based on the file name
    sorted_screenshots = sorted(screenshots.items(), key=lambda x: x[0], reverse=True)

    # Get only the first 10 elements of the list
    sorted_screenshots = sorted_screenshots[:size]

    # Generate base64 for each remaining screenshot
    for file_name, screenshot_info in sorted_screenshots:
      screenshot_info['base64'] = image_to_base64(getThumbnailPathFromFilepath(screenshot_info['path']))

    # Convert the list of tuples back to a dictionary
    return dict(sorted_screenshots)

  async def uploadScreenshot(self, filepath):
    try:
      # Validate that we have a valid webhook, otherwise break
      if(self.discordWebhookURL == "" or self.discordWebhookURL == False):
        log("No Valid Webhook URL Found - Sending to queue")
        await self.queueUploads(self, filepath, getFilenameFromFilepath(filepath))
        return False
      # Check to ensure we are online, if not send the file to the queue
      if await self.isOnline(self) == False:
        log("uploadScreenshot - Online Check Failed - Sending to queue")
        status = await self.queueUploads(self, filepath, getFilenameFromFilepath(filepath))
      else:
        status = await upload_file(filepath, self.discordWebhookURL)
        if(status == 200):
          await self.logSuccessfulUpload(self, getFilenameFromFilepath(filepath))
        log(status)
      return status
    except Exception as e:
      log(f"An error occurred: {e}")
    return False

  async def uploadScreenshots(self):
    try:
      newestScreenshot = get_newest_jpg(self)
      log("Newest Screenshot" + newestScreenshot)
      # Validate that we have a valid webhook, otherwise break
      if(self.discordWebhookURL == "" or self.discordWebhookURL == False):
        log("No Valid Webhook URL Found - Sending to queue")
        await self.queueUploads(self, newestScreenshot, getFilenameFromFilepath(newestScreenshot))
        return False
      
      # Check to ensure we are online
      if await self.isOnline(self) == False:
        log("uploadScreenshots - Online Check Failed - Sending to queue")
        status = await self.queueUploads(self, newestScreenshot, getFilenameFromFilepath(newestScreenshot))
      else:
        status = await upload_file(newestScreenshot, self.discordWebhookURL)
        if(status == 200):
          await self.logSuccessfulUpload(self, getFilenameFromFilepath(newestScreenshot))
          await self.processQueue(self, False)
        log(f"upload_file response: {status}")
      return status
    except Exception as e:
      log(f"An error occurred: {e}")
    return False

  async def logSuccessfulUpload(self, filename):
    try:
      uploaded = self.settingsManager.getSetting("successfulUploads", {})
      uploaded[filename] = {'timestamp': int(time.time())}
      # Limit the number of successful uploads stored to 10
      if len(uploaded) > 12:
        uploaded.pop(next(iter(uploaded)))

      self.settingsManager.setSetting("successfulUploads", uploaded)
      return True
    except Exception as e:
      log(f"queueUploads - Error: {e}")
      return False
    
  async def getSuccessfulUploads(self):
    try:
      uploaded = self.settingsManager.getSetting("successfulUploads", {})
      return {'uploads': uploaded}
    except Exception as e:
      log(f"getSuccessfulUploads - Error: {e}")
      return False
    
  async def clearSuccessfulUploads(self):
    try:
      self.settingsManager.setSetting("successfulUploads", {})
      return True
    except Exception as e:
      log(f"clearSuccessfulUploads - Error: {e}")
      return False

  async def queueUploads(self, filepath, filename):
    try:
      queue = self.settingsManager.getSetting("uploadQueue", {})
      queue[filename] = {'path': filepath, 'name': filename, 'id': filename}
      self.settingsManager.setSetting("uploadQueue", queue)
      return 307
    except Exception as e:
      log(f"queueUploads - Error: {e}")
      return 500
    
  async def getUploadQueue(self):
    try:
      queue = self.settingsManager.getSetting("uploadQueue", {})
      return queue
    except Exception as e:
      log(f"getUploadQueue - Error: {e}")
      return False
    
  async def removeFromQueue(self, filename):
    try:
      queue = self.settingsManager.getSetting("uploadQueue", {})
      del queue[filename]
      self.settingsManager.setSetting("uploadQueue", queue)
      return True
    except Exception as e:
      log(f"removeFromQueue - Error: {e}")
      return False
    
  async def clearQueue(self):
    try:
      self.settingsManager.setSetting("uploadQueue", {})
      return True
    except Exception as e:
      log(f"clearQueue - Error: {e}")
      return False

  async def processQueue(self, checkStatus=True):
    try:
      # Check to ensure we are online
      if(checkStatus == True):
        if await self.isOnline(self) == False:
          debuglog("processQueue - Online Check Failed", self.settingsManager.getSetting("debug", False))
          return False
      # Fetch the current queue
      queue = self.settingsManager.getSetting("uploadQueue", {})
      # Check if the queue is empty, if so no need to continue
      if len(queue) == 0:
        debuglog("Queue is empty", self.settingsManager.getSetting("debug", False))
        return False
      # Log the length of the queue
      debuglog(f"Offline Queue Length: {len(queue)}", self.settingsManager.getSetting("debug", False))
      # Loop through the queue and upload each file
      for filename, fileinfo in queue.items():
        status = await upload_file(fileinfo['path'], self.discordWebhookURL)
        if(status == 200):
          await self.logSuccessfulUpload(self, getFilenameFromFilepath(fileinfo['path']))
        debuglog(f"processQueue - {filename} - {status}", self.settingsManager.getSetting("debug", False))
        if status == 200:
          del queue[filename]
    except Exception as e:
      log(f"processQueue - Error: {e}")

  def _getGuides(self):
    for guideFileName in os.listdir(self.guidesDirPath):
      with open(os.path.join(self.guidesDirPath, guideFileName), 'r') as guideFile:
        guideName = guideFileName.replace("_", " ").replace(".md", "")
        self.guides[guideName] = "".join(guideFile.readlines())

    pass

  async def isOnline(self):
    try:
      # DEV - Force offline mode for testing
      if(self.settingsManager.getSetting("devOfflineMode", False) == True):
        return False
      # Attempt to create a socket connection to a known server
      socket.create_connection(("8.8.8.8", 53), timeout=1)
      self.settingsManager.setSetting("online", True)
      return True
    except OSError:
      pass
    self.settingsManager.setSetting("online", False)
    return False

  async def getGuides(self):
    self._getGuides(self)
    return self.guides

  async def getImage(self, filepath):
    try:
      return await image_to_base64(filepath)
    except Exception as e:
      log(f"An error occurred [getImage]: {e}")
    return False
  
  async def getLogs(self):
    try:
      log_file_path = f"{self.homebrewDirPath}/logs/{os.path.basename(self.pluginDirPath)}/DeckShare.log"
      with open(log_file_path, "r") as logFile:
        lines = logFile.readlines()
      last_50_lines = lines[-100:]
      return {'logs': last_50_lines}
    except Exception as e:
      log(f"An error occurred [getLogs]: {e}")
    return False
  
  async def getAboutContent(self):
    try:
      about_file_path = f"{self.pluginDirPath}/README.md"
      with open(about_file_path, "r") as aboutFile:
        aboutContent = aboutFile.read()
      return {'about': aboutContent}
    except Exception as e:
      log(f"An error occurred [getAboutContent]: {e}")
    return False

# Returns the newest created screenshot in the Steam screenshots directory
def get_newest_jpg(self):
    try:
      user = self.GetSteamId(self)
      url = "{0}userdata/{1}/760/remote/".format(self.steamdir, user & 0xFFFFFFFF)
      log("GetNewestJpg called")

      # Check if the directory exists
      if not os.path.isdir(url):
        log(f"Directory does not exist: {url}")
        return None

      # Initialize the newest file and its creation time
      newest_file = None
      newest_file_time = None

      # Traverse the directory tree
      try:
        for root, dirs, files in os.walk(url):
          if "thumbnails" not in root:
            for file in files:
              if file.endswith(".jpg"):
                file_path = os.path.join(root, file)
                file_time = os.path.getctime(file_path)
                if newest_file is None or file_time > newest_file_time:
                  newest_file = file_path
                  newest_file_time = file_time
      except Exception as e:
          log(f"An error occurred while searching for .jpg files: {e}")
          return None

      # Check if no .jpg files were found
      if newest_file is None:
        log("No .jpg files found")

      log(f"Newest .jpg file: {newest_file}")
      return newest_file
    except Exception as e:
      log(f"An error occurred: {e}")
      return None

async def upload_file(filename, webhook_url):
    try:
      log("UploadFile called" + filename)
      # Check if the file exists
      if not os.path.isfile(filename):
        print(f"File {filename} does not exist")
        return

      # Prepare the file for sending
      with open(filename, 'rb') as f:
        file_data = f.read()
        file_type = mimetypes.guess_type(filename)[0]
        file_name = os.path.basename(filename)

      # Prepare the POST data
      boundary = 'wL36Yn8afVp8Ag7AmP8qZ0SA4n1v9T'
      data = []
      data.append(('--' + boundary).encode())
      data.append(('Content-Disposition: form-data; name="file"; filename="%s"' % file_name).encode())
      data.append(('Content-Type: %s' % file_type).encode())
      data.append(''.encode())
      data.append(file_data)
      data.append(('--' + boundary + '--').encode())
      data.append(''.encode())
      body = b'\r\n'.join(data)

      # Separate the host and the path of the URL
      from urllib.parse import urlparse
      parsed_url = urlparse(webhook_url)
      host = parsed_url.netloc
      path = parsed_url.path

      # Create an unverified SSL context
      context = ssl._create_unverified_context()

      # Send the POST request
      conn = http.client.HTTPSConnection(host, context=context)
      headers = {
        'Content-Type': 'multipart/form-data; boundary=%s' % boundary,
        'Content-Length': str(len(body))
      }
      conn.request('POST', path, body, headers)
      response = conn.getresponse()

      # Check the status code of the response for success or failure
      if response.status == 200:
        log(f"Successfully uploaded {filename} to Discord")
        return response.status
      else:
        log(f"Failed to upload {filename} to Discord")
        return False
    except Exception as e:
      log(f"An error occurred: {e}")
      return False

def image_to_base64(image_path):
  try:
    with open(image_path, "rb") as image_file:
      # Read image file
      image_data = image_file.read()
      # Encode image data as base64
      base64_encoded = base64.b64encode(image_data).decode('utf-8')
      return base64_encoded
  except Exception as e:
    log(f"Error: {e}")
    return None

def getFilenameFromFilepath(filepath):
  return os.path.basename(filepath)

def getThumbnailPathFromFilepath(filepath):
  return filepath.replace(os.path.basename(filepath), "thumbnails/" + os.path.basename(filepath))