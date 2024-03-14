#!/usr/bin/env python
import os
import sys
import ssl

sys.path.append(os.path.dirname(__file__))
sys.path.append(os.path.join(os.path.dirname(__file__), 'steampy'))

import vdf
import http.client
import mimetypes
from py_backend.instanceManager import InstanceManager
from py_backend.jsInterop import JsInteropManager
from settings import SettingsManager
from py_backend.logger import log

Initialized = False

class Plugin:
  log(f"Plugin loaded. User: {os.environ['DECKY_USER']}")
  pluginUser = os.environ["DECKY_USER"]
  pluginSettingsDir = os.environ["DECKY_PLUGIN_SETTINGS_DIR"]
  pluginDirPath = os.path.dirname(__file__)
  guidesDirPath = f"/home/{pluginUser}/homebrew/plugins/deckshare-plugin/guides"
  settingsManager = SettingsManager(name='DeckShare', settings_directory=pluginSettingsDir)
  steamdir = "/home/deck/.local/share/Steam/"
  guides = {}
  discordWebhookURLBase = "https://discord.com/api/webhooks/"

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
      if response.status == 200:
        log(f"Successfully validated Webhook URL")
        return True
      else:
        log(f"Failed to validate Webhook URL")
      return False
    except Exception as e:
      log(f"An error occurred: {e}")
      return False
        

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

  def GetSteamId(self):
    d = vdf.parse(open("{0}config/loginusers.vdf".format(self.steamdir), encoding="utf-8"))
    users = d['users']
    for id64 in users:
        if users[id64]["MostRecent"] == "1":
            user = int(id64)
            return user
  
  async def getSetting(self, key, defaultVal):
    return self.settingsManager.getSetting(key, defaultVal)

  async def setSetting(self, key, newVal):
    self.settingsManager.setSetting(key, newVal)
    log(f"Set setting {key} to {newVal}")
    pass

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

    if "webSocketPort" not in self.settingsManager.settings:
      log("No WebSocket port detected in settings.")
      self.settingsManager.setSetting("webSocketPort", "5050")
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

  # Normal methods: can be called from JavaScript using call_plugin_function("signature", argument)
  async def getScreenshots(self):
    screenshots = {}
    user = self.GetSteamId(self)
    url = "{0}userdata/{1}/760/remote/".format(self.steamdir, user & 0xFFFFFFFF)

    for root, dirs, files in os.walk(url):
        for file in files:
            if file.endswith(".jpg"):
                screenshots[file] = {'path': os.path.join(root, file), 'name': file, 'id': file}

    # Convert the dictionary to a list of tuples and sort it based on the file name
    sorted_screenshots = sorted(screenshots.items(), key=lambda x: x[0], reverse=True)

    # Get only the first 10 elements of the list
    sorted_screenshots = sorted_screenshots[:5]

    # Convert the list of tuples back to a dictionary
    return dict(sorted_screenshots)

  async def uploadScreenshot(self, filepath):
    try:
        if(self.discordWebhookURL == "" or self.discordWebhookURL == False):
          log("No Valid Webhook URL Found")
          return False
        log("UploadScreenshots called")
        newestScreenshot = filepath
        log("Newest Screenshot" + newestScreenshot)
        status = await upload_file(newestScreenshot, self.discordWebhookURL)
        log(status)
        return status
    except Exception as e:
        log(f"An error occurred: {e}")
    return False

  async def uploadScreenshots(self):
    try:
        if(self.discordWebhookURL == "" or self.discordWebhookURL == False):
          log("No Valid Webhook URL Found")
          return False
        log("UploadScreenshots called")
        newestScreenshot = get_newest_jpg(self)
        log("Newest Screenshot" + newestScreenshot)
        status = await upload_file(newestScreenshot, self.discordWebhookURL)
        log(status)
        return status
    except Exception as e:
        log(f"An error occurred: {e}")
    return False

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
          print(f"Successfully uploaded {filename} to Discord")
          return response.status
      else:
          print(f"Failed to upload {filename} to Discord")
          return False
    except Exception as e:
      log(f"An error occurred: {e}")
      return False