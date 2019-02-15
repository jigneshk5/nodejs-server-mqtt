var $;
$ = require('jquery');
const express = require('express');
var Client = require('strong-pubsub');
var Adapter = require('strong-pubsub-mqtt');
var client = new Client({
  host: 'test.mosquitto.org',
  port: 1883
}, Adapter);
var db = require('../../db');
const router = express.Router();
var id;
var topics = [];
var mqttArr = [];

client.connect(function () {

      console.log("Server connected to the Mqtt Broker");
        
})
client.on('message', function(topic, msg,) {
    console.log(msg.toString());
    // if(msg != null){
    let obj = JSON.parse(msg.toString()); 
    console.log(obj.fl);

 });
 client.on("error", function(error) {
  console.log("ERROR: ", error);
});

client.on('offline', function() {
  console.log("offline");
});

client.on('reconnect', function() {
  console.log("reconnect");
});
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
          client.subscribe(row.TOPIC);
          //client.publish(row.TOPIC,"",{ retain:true, qos:1});    //Clear the retained msg
      i++;
    });
    res.send(topics);
  });
});

  module.exports = router;