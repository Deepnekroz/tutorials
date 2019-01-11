import argparse
import paho.mqtt.client as mqtt
import json
import logging
import random
import string

DEFAULT_KPC_HOST = "mykaa.info"
DEFAULT_KPC_PORT = 30720

EPMX_INSTANCE_NAME = "epmx"

APPLICATION_NAME = "lamppost"
APPLICATION_VERSION = "lamppost_v1"


# Configure logging
logger = logging.getLogger('mqtt-client')
logger.setLevel(logging.DEBUG)

hdl = logging.StreamHandler()
hdl.setLevel(logging.DEBUG)
hdl.setFormatter(logging.Formatter('%(levelname)s: %(message)s'))

logger.addHandler(hdl)


# Parse command line arguments and get device name
parser = argparse.ArgumentParser(description="MQTT client for Sample Lamppost application")
parser.add_argument("-d", "--deviceName", action="store", dest="deviceName", required=True, help="Name of connected device")
parser.add_argument("-s", "--host", action="store", dest="host", default=DEFAULT_KPC_HOST, help="Server host to connect to")
parser.add_argument("-p", "--port", action="store", dest="port", default=DEFAULT_KPC_PORT, help="Server port to connect to")
args = parser.parse_args()
token = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(6))
client_id = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(6))
device_name = args.deviceName
host = args.host
port = args.port
logger.info("Using EP token {0}, server at {1}:{2}".format(token, host, port))


# Returns hard-coded metadata
def composeMetadata(deviceName):
  return json.dumps(
    {
      "city":"New York",
      "address":"160-218 Jefferson St",
      "model":"MyLightBrand A300",
      "fwVersion":"v0.4-RC5",
      "deviceName":deviceName # Temporarily added for web browsing convenience
    }
  )

def connectToServer(client, host, port):
  logger.info("Connecting to KPC instance at {0}:{1}...".format(host, port))
  client.connect(host, port, 60)
  logger.info("Successfully connected")

def disconnectFromServer(client, host, port):
  logger.info("Disconnecting from server at {0}:{1}.".format(host, port))
  client.disconnect()
  logger.info("Successfully disconnected")

# Compose KP1 topic for metadata
topic_metadata = "kp1/{application_version}/{service_instance}/{resource_path}".format(
  application_version=APPLICATION_VERSION,
  service_instance=EPMX_INSTANCE_NAME,
  resource_path="{token}/update/keys".format(token=token)
)
logger.debug("Composed metadata topic: {}".format(topic_metadata))


# Initiate server connection
client = mqtt.Client(client_id=client_id)
connectToServer(client=client, host=host, port=port)

# Send metadata once on the first connection
data = composeMetadata(deviceName=device_name)
client.publish(topic=topic_metadata, payload=data)
logger.info("Sent metadata: {0}\n".format(data))

# Disconnect from server
disconnectFromServer(client=client, host=host, port=port)
