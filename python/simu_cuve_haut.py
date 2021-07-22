import paho.mqtt.client as mqtt
import json, time, random
from random import randrange
from time import sleep

GROUPNAME="WEB2-GROUPE16"

MQTT_BROKER="hetic.arcplex.fr"
MQTT_USERNAME="GROUPE6"
MQTT_PASSWORD="60850033"
NODE_ID=["6465"]
SENSOR_ID_132="132" #Sonde de Niveau
SENSOR_ID_108="108" #Sonde de débimètre
SENSOR_ID_102="102" #Sonde d'état (valve)

CUVE_MAX = 100
DEBIT_MIN = 35
DEBIT_MAX = 55


def randomize(val_min, val_max):
  return round(random.uniform(val_min, val_max), 2)

def run():
    def task(val_min, debit = False, valve):      
        client = mqtt.Client("client")
        client.username_pw_set(username=MQTT_USERNAME,password=MQTT_PASSWORD)
        client.connect(MQTT_BROKER, keepalive=60)
        
        for node in NODE_ID:
            #CUVE
            MQTT_TOPIC = GROUPNAME + "/" + node + "/" + str(SENSOR_ID_132)
            MQTT_MSG = json.dumps({"source_address": node, "sensor_id": SENSOR_ID_132, "tx_time_ms_epoch": int(time.time()),
                               "data": {"value": val_min}, "alert": 0})
            client.publish(MQTT_TOPIC, MQTT_MSG)
            print("MQTT Mis à jour - Node %s Timestamp : %s"%(node,int(time.time())))
            #DEBIT
            if debit :

              debit_val = randomize(DEBIT_MIN, DEBIT_MAX) 
              MQTT_TOPIC = GROUPNAME + "/" + node + "/" + str(SENSOR_ID_108)
              MQTT_MSG = json.dumps({"source_address": node, "sensor_id": SENSOR_ID_108, "tx_time_ms_epoch": int(time.time()),
                                "data": {"value": debit_val}, "alert": 0})
              client.publish(MQTT_TOPIC, MQTT_MSG)
              print("MQTT Mis à jour - Node %s Timestamp : %s"%(node,int(time.time())))

            #VALVE
            if val_min < 15:
              valve = 0

            MQTT_TOPIC = GROUPNAME + "/" + node + "/" + str(SENSOR_ID_102)
            MQTT_MSG = json.dumps({"source_address": node, "sensor_id": SENSOR_ID_102, "tx_time_ms_epoch": int(time.time()),
                              "data": {"value": valve}})
            client.publish(MQTT_TOPIC, MQTT_MSG)
            print("MQTT Mis à jour - Node %s Timestamp : %s"%(node,int(time.time())))
        
        client.disconnect()    
    task()
    val_min = 45
    valve = 1
    while val_min <= CUVE_MAX :
      if val_min > 80 :
          val_min -= 1.5
          debit = True
          sleep(10)
      else:
          val_min += 2
          sleep(60*10)  
      task(val_min, debit, valve)
        
run()