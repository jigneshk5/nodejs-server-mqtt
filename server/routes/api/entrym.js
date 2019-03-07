const express = require('express');
var mqtt = require('mqtt');
let options = {
  "clientId": 'mqttjs_' + Math.random().toString(16).substr(2, 8),
  "keepalive": 30,
  "connectTimeout": 30000,    //Wait till 30sec before disconnecting
  "clean": false,
  "protocolId": "MQTT",
  "protocolVersion": 4
}
var client  = mqtt.connect('mqtt://127.0.0.1',options)
var db = require('../../db');
const router = express.Router();
var id;
var topics = [];
var topics1 = [];
var mqttArr = [];
let newObj;
client.on('connect', function () {
    //console.log("Server connected to the Mqtt Broker");    
})
client.on('message', function(topic, msg) {
  client.publish(topics1,"",{ retain:true, qos:1});    //Clear the retained msg
    console.log(msg.toString());

    let obj = JSON.parse(msg.toString());
    //console.log(obj.fl);
    if(topics1.includes(topic)){
      let topicObj = {topic,obj};
      mqttArr.push(topicObj);
      topics1 = topics1.filter(item => item !== topic)
    }
    else{
      newObj = JSON.parse(msg.toString());
      for(let i=0; i<mqttArr.length; i++){
        if(mqttArr[i].topic == topic){
          mqttArr[i].obj.fc = newObj.fc;
          mqttArr[i].obj.fl = newObj.fl;
        }
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
    }
    // close the database connection
    //db.close();
 });
 client.on("error", function(error) {
  console.log("ERROR: ", error);
});

// client.on('offline', function() {
//   console.log("offline");
// });

// client.on('reconnect', function() {
//   console.log("reconnect");
// });
// Ping to the server for subscribing the topics

router.get('/', (req, res) => {
  let i=0;
  //let sql1 = ;
  db.all('SELECT topic FROM user', [], (err, rows) => {
    if (rows==null) {
      res.status(400).send("Data not in db");              //Bad Request
      return;
    }
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      //console.log(row.topic);
          topics[i]= row.TOPIC;
          client.subscribe(row.TOPIC,{qos:1});
      i++;
    });
    topics1 = topics;
    res.send(topics);
  });
});

  module.exports = router;