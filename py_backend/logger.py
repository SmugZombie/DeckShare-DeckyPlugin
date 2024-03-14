#!/usr/bin/env python
import logging
import os

logging.basicConfig(filename=os.path.join(os.environ["DECKY_PLUGIN_LOG_DIR"], "DeckShare.log"), format="[Deck Share] %(asctime)s %(levelname)s %(message)s", filemode="w+", force=True)
logger=logging.getLogger()
logger.setLevel(logging.INFO) # can be changed to logging.DEBUG for debugging issues

def log(txt):
  logger.info(txt)