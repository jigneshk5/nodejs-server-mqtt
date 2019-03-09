const express = require('express');
var db = require('../../db');
const router = express.Router();
var mqtt = require('mqtt');
var topics = [];
var topics1 = [];
var t = [];
var mqttArr = [];
let newObj;
let x = 0;
let options = {
  "clientId": 'mqttjs_' + Math.random().toString(16).substr(2, 8),
  "keepalive": 30,
  "connectTimeout": 30000,    //Wait till 30sec before disconnecting
  "clean": false,
  "protocolId": "MQTT",
  "protocolVersion": 4
}
var client  = mqtt.connect('mqtt://127.0.0.1',options)

client.on('connect', function () {
  //console.log("Server connected to the Mqtt Broker");    
})
client.on('message', function(topic, msg) {

Array.prototype.setAll = function(v) {
  var i, n = topics.length; 
  for (i = 0; i < n; ++i) {
    this[i] = v+x;
    
  }
};
t.setAll(0);
console.log(t);
  //client.publish(topics,"",{ retain:true, qos:1});    //Clear the retained msg
  //console.log(msg.toString());

  let obj = JSON.parse(msg.toString());
  let timer;

  //console.log(obj.fl);

  if(topics1.includes(topic)){
    let topicObj = {topic,obj,timer};
    mqttArr.push(topicObj);
    topics1 = topics1.filter(item => item !== topic)
  }

  newObj = JSON.parse(msg.toString());
  for(let i=0; i<mqttArr.length; i++){
    if(mqttArr[i].topic == topic){
      mqttArr[i].obj.fc = newObj.fc;
      mqttArr[i].obj.fl = newObj.fl;
      mqttArr[i].timer = t[i];
    }
  }
  console.log(mqttArr);
  let sql = `UPDATE user
              SET FUEL_CAPACITY = ?,FUEL_LEVEL = ?
              WHERE topic = ?`;
  for(let i=0; i<mqttArr.length; i++){
    if(mqttArr[i].topic == topic){
      db.run(sql,[mqttArr[i].obj.fc,mqttArr[i].obj.fl,topic], function(err) {
        if (err) {
          return console.error(err.message);
        }
        console.log(`Row(s) updated: ${this.changes}`);
      
       });
     }
     setInterval(function(){
      if(topics.includes(topic)){
        //if(isEmpty(obj))
          x= x+1;
      }
    },4000)

   }
  //close the database connection
  //db.close();
})
client.on("error", function(error) {
console.log("ERROR: ", error);
});
function isEmpty(object) {
  for(var key in object){
      if(object.hasOwnProperty(key))
          return false;
  }
  return true;
}

//Unsubscrbing a topic
setInterval(function(){
  for(let i=0; i<mqttArr.length; i++){
    mqttArr[i].obj = {};
        //if(isEmpty(obj))
          if(isEmpty(mqttArr[i].obj) && mqttArr[i].timer>30){ //If obd device will not send data for 30sec
            console.log("Unsubscribed"+mqttArr[i].topic);
            topics = topics.filter(item => item !== mqttArr[i].topic)
            //mqttArr.splice(i,1);
            console.log(mqttArr);
            client.unsubscribe(mqttArr[i].topic);
          }
    }
},1000)

//Post req for subscrbing the topic
router.post('/', (req, res) => {
  let sql = `SELECT topic FROM user WHERE VIN = ?`;
  let vin = req.body.VIN;
  db.get(sql, [vin], (err, row) => {
    if (row ==null) {
      res.status(400).send("User not in db");              //Bad Request
      return;
    }
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
      client.subscribe(row.TOPIC);
      topics.push(row.TOPIC);
      //client.subscribe(topics);
      topics1 = topics;
      console.log(topics);
      res.status(200).send("topic found");
  });
});




module.exports = router;