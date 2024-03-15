# DeckShare - Discord Powered Screenshot Uploader

DeckShare is a simple DeckyLoader plugin that monitors SteamOS for new screenshots using a hook and automatically posts them to Discord via the provided webhook. (You must get your own [Discord webhook](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks) url and provide it to the plugin upon first time setup)

# Overview
This is an expansion upon the original project I made here: [DeckShare](https://github.com/SmugZombie/DeckShare)

# Installation
1. [Install the Decky plugin loader](https://github.com/SteamDeckHomebrew/decky-loader#installation)
2. ~~Use the built in plugin store to download the DeckShare plugin~~ (Not on the store yet)
2. Enable Developer Mode in Decky
3. Grab the URL or download the latest release from the releases Page
4. Provide the URL or File to Decky and install

# Using the plugin
Upon installation and first load of the plugin you should see a Toast notification that says you need to complete setup of the plugin

1. Open the Decky Side Bar and Click on DeckShare
2. 
   ![image](https://github.com/SmugZombie/DeckShare-DeckyPlugin/assets/11764327/caed3493-5f39-4380-b19b-923ecb3fb5b4)

3. Provide your [Discord webhook](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks) url and click Save. You can now choose to automatically share new screenshots, disable/enable notifications of when screenshots are shared, and view your screenshot statistics.
4. 
   ![image](https://github.com/SmugZombie/DeckShare-DeckyPlugin/assets/11764327/d975e73b-4eec-4789-9d90-2347d6bc3f33)

   ![image](https://github.com/SmugZombie/DeckShare-DeckyPlugin/assets/11764327/170fdba9-6fd4-4a81-93cc-2191e8a49d51)


The plugin should now be setup providing it was given a valid webhook url. At this point any future screenshots should automatically be uploaded and you will receive a confirmation toast notification.

![image](https://github.com/SmugZombie/DeckShare-DeckyPlugin/assets/11764327/6a50c5a6-bf5d-4bc5-ada0-3891339a33d8)

Additionally you can see a list of the latest 5 screenshots in order from newest to oldest in which you can use to resend an image. This is particularly useful if you had a screenshot you wished to share BEFORE installing the plugin.

# Future
1. Add additional endpoints (Imgur? Another folder on the device for use with a cloud service sync?)
