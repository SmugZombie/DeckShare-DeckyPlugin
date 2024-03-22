# DeckShare - Discord Powered Screenshot Uploader

DeckShare is a simple DeckyLoader plugin that monitors SteamOS for new screenshots using a hook and automatically posts them to Discord via the provided webhook. (You must get your own [Discord webhook](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks) url and provide it to the plugin upon first time setup)

# Overview
This is an expansion upon the original project I made here: [DeckShare](https://github.com/SmugZombie/DeckShare)

# Installation
1. [Install the Decky plugin loader](https://github.com/SteamDeckHomebrew/decky-loader#installation)
2. ~~Use the built in plugin store to download the DeckShare plugin~~ (Working on getting it in the store soon)
2. Enable Developer Mode in Decky
3. Grab the URL or download the latest release from the [releases Page](https://github.com/SmugZombie/DeckShare-DeckyPlugin/releases)
4. Provide the URL or File to Decky and install

# Using the plugin
Upon installation and first load of the plugin you should see a Toast notification that says you need to complete setup of the plugin

1. Open the Decky Side Bar and Click on DeckShare
2. 
   ![image](https://github.com/SmugZombie/DeckShare-DeckyPlugin/assets/11764327/89083ddc-a2d4-4ec8-a2b6-be9f81fc570b)

3. Click on advanced, then Settings, and provide your [Discord webhook](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks) url and click Save. You can now choose to automatically share new screenshots, disable/enable notifications of when screenshots are shared, and view your screenshot statistics.
4. 
   ![image](https://github.com/SmugZombie/DeckShare-DeckyPlugin/assets/11764327/60bfe0ff-cfcb-408f-b6bb-1eb40f03c7bf)
   ![image](https://github.com/SmugZombie/DeckShare-DeckyPlugin/assets/11764327/17a5c4a9-ddff-4a53-aaf9-94f0eed6a20c)
   ![image](https://github.com/SmugZombie/DeckShare-DeckyPlugin/assets/11764327/b92a0ccd-59e9-4809-92a6-27ebacb4ab80)
   ![image](https://github.com/SmugZombie/DeckShare-DeckyPlugin/assets/11764327/3dc95645-20c6-4f09-a2d1-5884580101b7)
   ![image](https://github.com/SmugZombie/DeckShare-DeckyPlugin/assets/11764327/bb704304-c0d4-426c-8a01-3c8a6e90d6fc)

# Features
* Automatic publishing of new screenshots to Discord directly via webhook
* Offline Mode detection. If autoshare is enabled screenshots will be queued until the online status is changed and the images will automatically be published.
* Ability to see the last 15 screenshots you have taken, you can now choose to share again, or if you have auto share disabled you can share manually.
* Toast notification confirmation when screenshots are sent - Additionally a toggle to disable those notifications.

![image](https://github.com/SmugZombie/DeckShare-DeckyPlugin/assets/11764327/6a50c5a6-bf5d-4bc5-ada0-3891339a33d8)

# Future
1. Add additional endpoints (Imgur? Another folder on the device for use with a cloud service sync?)
2. ???

# Give Thanks

Like this plugin? [Buy me a beer!](https://www.paypal.com/paypalme/regli)
