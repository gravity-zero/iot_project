import paho.mqtt.client as mqtt
import json, time, random
from random import randrange
from time import sleep

GROUPNAME="WEB2-GROUPE16"

MQTT_BROKER="hetic.arcplex.fr"
MQTT_USERNAME="GROUPE6"
MQTT_PASSWORD="60850033"
NODE_ID=["6465", "2564"]
SENSOR_ID_132="132" #Sonde de Niveau
SENSOR_ID_108="108" #Sonde de débimètre
SENSOR_ID_102="102" #Sonde d'état (valve)

CUVE_MAX = 300000
DEBIT_MIN = 35
DEBIT_MAX = 55


def randomize(val_min, val_max):
  return round(random.uniform(val_min, val_max), 2)

def run():
    def task(contenance, debit, valve, alert):      
        client = mqtt.Client("client")
        client.username_pw_set(username=MQTT_USERNAME,password=MQTT_PASSWORD)
        client.connect(MQTT_BROKER, keepalive=60)
        
        for node in NODE_ID:
            #CUVE
            if node == "6465" :
              mqtt_topic = GROUPNAME + "/" + node + "/" + str(SENSOR_ID_132)
              mqtt_msg = json.dumps({"source_address": node, "sensor_id": SENSOR_ID_132, "tx_time_ms_epoch": int(time.time()),
                                "data": {"value": contenance}, "alert": alert})
              client.publish(mqtt_topic, mqtt_msg)
              print("MQTT Mis à jour - Node %s Timestamp : %s"%(node,int(time.time())))
            #DEBIT
            if debit :
              mqtt_topic = GROUPNAME + "/" + node + "/" + str(SENSOR_ID_108)
              mqtt_msg = json.dumps({"source_address": node, "sensor_id": SENSOR_ID_108, "tx_time_ms_epoch": int(time.time()),
                                "data": {"value": debit_val}, "alert": alert})
              client.publish(mqtt_topic, mqtt_msg)
              print("MQTT Mis à jour - Node %s Timestamp : %s"%(node,int(time.time())))

            #VALVE
              mqtt_topic = GROUPNAME + "/" + node + "/" + str(SENSOR_ID_102)
              mqtt_msg = json.dumps({"source_address": node, "sensor_id": SENSOR_ID_102, "tx_time_ms_epoch": int(time.time()),
                                "data": {"value": valve}, "alert": alert})
              client.publish(mqtt_topic, mqtt_msg)
              print("MQTT Mis à jour - Node %s Timestamp : %s"%(node,int(time.time())))

        client.disconnect()    

    contenance = 0
    valve = 0
    debit = False
    launch = False
    alert = 0
    while contenance <= CUVE_MAX :

      if contenance > 159840 : #On commence à envoyer du débit
        launch = True
        valve = 1

      if launch : # Débit ON
        debit_val = randomize(DEBIT_MIN, DEBIT_MAX)
        if contenance > debit_val : # On décrémente tant que
          contenance -= debit_val
          debit = True
          sleep(10)
        else :  # On lève une alerte, on passe sur le réseau d'eau courante et on re-rempli la cuve
          alert = 1
          valve = 0
          launch = False
          sleep(10)  
      else : # Débit OFF, On rempli la cuve
        contenance += 6600
        sleep(60*10)        
      task(contenance, debit, valve, alert)

run()