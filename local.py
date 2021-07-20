import paho.mqtt.client as mqtt
import json, time, random
from datetime import datetime
from time import sleep

#Paramètres de connexion à compléter
#Nom du groupe sans espaces avec la nomenclature WEB2 ou WEB3
#Exemple : WEB2-GROUPE6
GROUPNAME="WEB2-GROUPE16"

MQTT_BROKER="hetic.arcplex.fr"

#Login et mot de passe du groupe
MQTT_USERNAME="GROUPE6"
MQTT_PASSWORD="60850033"
# un ID différent par Node
NODE_ID=["6465", "5851", "2564"]
#ID du sensor
SENSOR_ID="124"



#Type de donnée renvoyée : Random 0 ou 1
VAL_MIN = 6
VAL_MAX = 8

def run(cond):
    while datetime.now().minute not in {0, 6, 10, 20,21, 22, 23,25,26,27,28,29, 30, 40, 45, 50}:
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
        sleep(60)
        task()

run(True)
