const express = require('express');
var db = require('../../db');
const router = express.Router();
var mqtt = require('mqtt');
var topics = [];              //Contain all the active topics
var topics1 = [];             //Copy of topics used to set count for each topic single time
var topics2 = [];             //Copy of topics used to push alertMsg for each topic single time
var mqttArr = [];             //Array of topic,obj,count and alert for each active topic
var alertMsg=[];              //alertMsg is the 'alert' field of mqttArr defined globally
let obj={};                   //obj is the 'obj' field of mqttArr defined globally
let alert = {};               //alert is the 'alert' field of mqttArr defined globally
let count =[];                //count is the 'count' field of mqttArr defined globally
let period = 60;              //Time after which topic unsubscribed if no mqtt message received
let options = {               //Options carry all MQTT-related server options
  "clientId": 'mqttjs_' + Math.random().toString(16).substr(2, 8),
  "clean": false,
  "protocolId": "MQTT",
  "protocolVersion": 4
}
var client  = mqtt.connect('mqtt://127.0.0.1',options)

client.on('connect', function () {
  //console.log("Server connected to the Mqtt Broker");    //It's commented beacause it is called repetedly and fill the console
})
client.on('message', function(topic, msg) {

  if(IsJSONString(msg.toString())==true){                //Checking if the received mqtt msg is a valid json string
    obj = JSON.parse(msg.toString());

    newObj = JSON.parse(msg.toString());

    for(let i=0; i<mqttArr.length; i++){
      if(mqttArr[i].topic == topic){
        count[i]= period;
        mqttArr[i].count = count[i];
        mqttArr[i].obj.fl = newObj.fl;
        mqttArr[i].obj.tc = newObj.tc;
        mqttArr[i].obj.rpm = newObj.rpm;
        mqttArr[i].obj.speed = newObj.speed;
        mqttArr[i].obj.maf = newObj.maf;
        mqttArr[i].obj.ctemp = newObj.ctemp;
        mqttArr[i].obj.milage = newObj.milage;
        mqttArr[i].alert = newObj.alert;

        if(topics2.includes(topic)){
          if (mqttArr[i].alert.state=="true"){
            alertMsg.push(Object.assign({},{'Topic':mqttArr[i].topic},{'ALert':mqttArr[i].alert}));
          }
          topics2 = topics2.filter(item => item !== topic)
        }
      }
    }
    console.log(mqttArr);

    let sql = `UPDATE user
                SET FUEL_LEVEL = ?,TANK_CAPACITY = ?,RPM = ?,SPEED = ?,MAF = ?,
                COOLANT_TEMP = ?,MILAGE = ? WHERE REG_NUM = ?`;
    for(let i=0; i<mqttArr.length; i++){
      if(mqttArr[i].topic == topic){
        db.run(sql,[mqttArr[i].obj.fl,mqttArr[i].obj.tc,mqttArr[i].obj.rpm,
          mqttArr[i].obj.speed,mqttArr[i].obj.maf,mqttArr[i].obj.ctemp,
          mqttArr[i].obj.milage,topic], function(err) {
          if (err) {
            return console.error(err.message);
          }
          console.log(`Row(s) updated: ${this.changes}`);
        
        });
      }
    }
  }
  else{
    console.log("Send mqtt message as JSON String");
  }
})

client.on("error", function(error) {
console.log("ERROR: ", error);
});
function IsJSONString(text){
  if (typeof text!=="string"){
      return false;
  }
  try{
      JSON.parse(text);
      return true;
  }
  catch (error){
      return false;
  }
}
function IsEmpty(object) {
  for(var key in object){
      if(object.hasOwnProperty(key))
          return false;
  }
  return true;
}

//Unsubscrbing a topic
setInterval(function(){
  for(let i=0; i<mqttArr.length; i++){
      mqttArr[i].count=mqttArr[i].count-1;
      count[i]=mqttArr[i].count;
      console.log(mqttArr[i].topic+" "+mqttArr[i].count);
      if(mqttArr[i].count==0){ //If obd device will not send data for 30sec
        console.log("Unsubscribed: "+mqttArr[i].topic);
        topics = topics.filter(item => item !== mqttArr[i].topic)
        client.unsubscribe(mqttArr[i].topic);
        mqttArr.splice(i,1);
        //console.log(mqttArr);
      }
    }
},1000)

//Post req for subscrbing the topic
router.post('/', (req, res) => {
  obj = {};
  let sql = `SELECT REG_NUM FROM user WHERE REG_NUM = ?`;
  let reg = req.body.REG_NUM;
  db.get(sql, [reg], (err, row) => {
    if (row ==null) {
      res.status(400).send("User not in db");              //Bad Request
      return;
    }
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    client.subscribe(row.REG_NUM);
    if(topics.includes(row.REG_NUM)){
      console.log(topics);
    }
    else{
      topics.push(row.REG_NUM);
      topics1 = topics;
      topics2 = topics;
      console.log(topics);
    }
    Array.prototype.setPeriod = function() {
      var i, n = topics.length; 
      for (i = mqttArr.length; i < n; ++i) {
        console.log("check"+i);
        this[i] = period;
      }
    };
    count.setPeriod();  
    if(topics1.includes(row.REG_NUM)){
      let topic = row.REG_NUM;
      topicObj = {topic,obj,count,alert};
      mqttArr.push(topicObj);
      for(let i=0; i<mqttArr.length; i++){
        if(mqttArr[i].topic == row.REG_NUM){
          mqttArr[i].count = period;
        }
      }
      console.log(mqttArr);
      topics1 = topics1.filter(item => item !== topic)
    }
    //console.log(mqttArr);
    res.status(200).send("topic found");
  });
});

//Get active topics
router.get('/topics', (req, res) => {
    res.send(topics);
});

module.exports = router;
module.exports.alert = alertMsg;