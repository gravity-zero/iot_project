import paho.mqtt.client as mqtt
import json, time, random
from random import randrange

from time import sleep

GROUPNAME="WEB2-GROUPE16"

MQTT_BROKER="hetic.arcplex.fr"
MQTT_USERNAME="GROUPE6"
MQTT_PASSWORD="60850033"
NODE_ID=["2564"] #APRES FILTRE
SENSOR_ID="117" #Pression

VAL_MIN = 0
VAL_MAX = 20

def randomize():
  return round(random.uniform(VAL_MIN, VAL_MAX), 2)

def run(cond):

    def task():
        client = mqtt.Client("client")
        client.username_pw_set(username=MQTT_USERNAME,password=MQTT_PASSWORD)
        client.connect(MQTT_BROKER, keepalive=60)
        for node in NODE_ID:
            MQTT_TOPIC = GROUPNAME + "/" + node + "/" + str(SENSOR_ID)
            MQTT_MSG = json.dumps({"source_address": node, "sensor_id": SENSOR_ID, "tx_time_ms_epoch": int(time.time()),
                               "data": {"value": randomize()}, "infos": {"Before filtre": 1, "After filtre": 0}})
            client.publish(MQTT_TOPIC, MQTT_MSG)
            print("MQTT Mis à jour - Node %s Timestamp : %s"%(node,int(time.time())))
        client.disconnect()    
    task()
    while cond == True:
        sleep(60*randrange(10))
        task()

run(True)