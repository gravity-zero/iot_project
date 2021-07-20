import paho.mqtt.client as mqtt
import json, time, random
from time import sleep

GROUPNAME="WEB2-GROUPE16"

MQTT_BROKER="hetic.arcplex.fr"
MQTT_USERNAME="GROUPE6"
MQTT_PASSWORD="60850033"
NODE_ID=["2564"]
SENSOR_ID="108" #Débimètre

VAL_MIN = 12
VAL_MAX = 50

def randomize():
  return round(random.uniform(VAL_MIN, VAL_MAX), 2)

def run(cond):
    
    def task():
        value = randomize()      
        print(value)
        client = mqtt.Client("client")
        client.username_pw_set(username=MQTT_USERNAME,password=MQTT_PASSWORD)
        client.connect(MQTT_BROKER, keepalive=60)
        
        for node in NODE_ID:
            MQTT_TOPIC = GROUPNAME + "/" + node + "/" + str(SENSOR_ID)
            MQTT_MSG = json.dumps({"source_address": node, "sensor_id": SENSOR_ID, "tx_time_ms_epoch": int(time.time()),
                               "data": {"value": str(value) + "L/min"}})
            client.publish(MQTT_TOPIC, MQTT_MSG)
            print("MQTT Mis à jour - Node %s Timestamp : %s"%(node,int(time.time())))
        client.disconnect()    
    task()
    while cond == True:
        sleep(10)
        task()
run(True)