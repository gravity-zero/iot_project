import paho.mqtt.client as mqtt
import json, time, random
from datetime import datetime
from time import sleep

GROUPNAME="WEB2-GROUPE16"

MQTT_BROKER="hetic.arcplex.fr"
MQTT_USERNAME="GROUPE6"
MQTT_PASSWORD="60850033"
NODE_ID=["6465"]
SENSOR_ID="223" #Potassium

VAL_MIN = 0.6
VAL_MAX = 1

def run(cond):
    while datetime.now().minute not in {0, 10, 20, 30, 40, 50}:
        sleep(1)
    def task():
        client = mqtt.Client("client")
        client.username_pw_set(username=MQTT_USERNAME,password=MQTT_PASSWORD)
        client.connect(MQTT_BROKER, keepalive=60)
        for node in NODE_ID:
            MQTT_TOPIC = GROUPNAME + "/" + node + "/" + str(SENSOR_ID)
            MQTT_MSG = json.dumps({"source_address": node, "sensor_id": SENSOR_ID, "tx_time_ms_epoch": int(time.time()),
                               "data": {"value": round(random.uniform(VAL_MIN, VAL_MAX), 2)}})
            client.publish(MQTT_TOPIC, MQTT_MSG)
            print("MQTT Mis à jour - Node %s Timestamp : %s"%(node,int(time.time())))
        client.disconnect()    
    task()
    while cond == True:
        sleep(60*10)
        task()

run(True)