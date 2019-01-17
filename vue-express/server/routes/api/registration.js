const express = require('express');
const mongodb = require('mongodb');
var Client = require('strong-pubsub');
var Adapter = require('strong-pubsub-mqtt');
var db = require('../../db');
let i=1;
const router = express.Router();
var client = new Client({host: 'test.mosquitto.org', port: 1883}, Adapter);

client.on('message', function(topic, msg) {
  console.log(topic, msg.toString()); // => movies birdman
 });


//Get post

//let stmt = userDB.run(`select * from langs`);


router.get('/', async (req, res) => {
    // const carData = await loadCarData();
    // res.send(await carData.find({}).toArray());
    var x=[];
    let sql = `SELECT CustomerName cn,PHONE ph,EMAIL mail,RFID,ADDRESS ad,VIN,MAC,topic,ACTIVE,VEHICLE_TYPE vt,
    FUEL_TYPE ft,FUEL_LEVEL fl,FUEL_CAPACITY fc,MILAGE,DateOfCreation dc,DateOfUpdation du,OtherData od FROM user`;
    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach((row) => {
        var rowObj = Object.assign({},[row.cn,row.ph,row.mail,row.RFID,row.ad,row.VIN,row.MAC,row.topic,row.ACTIVE,row.vt
          ,row.ft,row.fl,row.fc,row.MILAGE,row.dc,row.du,row.od]);
        x.push(rowObj);
      });
      res.send(x);
});
  });
//Add post
router.post('/', async (req, res) => {
  client.subscribe(req.body.topic);
  // const carData = await loadCarData();
  // await carData.insertOne({
  //   topic: req.body.topic,
  //   mac : req.body.mac,
  //   vin: req.body.carnum
  // })
  db.run(`CREATE TABLE IF NOT EXISTS user(  
    [CustomerId] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,  
    [CustomerName] VARCHAR(50) NOT NULL,
	[PHONE] VARCHAR(50) NOT NULL UNIQUE,
	[EMAIL] VARCHAR(50) NULL,
	[ADDRESS] VARCHAR(50) NOT NULL,
	[RFID] INTEGER NOT NULL UNIQUE,
    [VIN] INTEGER  NOT NULL, 
	[MAC] VARCHAR(50) NOT NULL,
    [TOPIC] VARCHAR(50) NOT NULL,
	[ACTIVE] INT NOT NULL,
    [VEHICLE_TYPE] VARCHAR(50) NOT NULL,
	[FUEL_TYPE] VARCHAR(50) NOT NULL,
	[FUEL_LEVEL] VARCHAR(50) NOT NULL,
	[FUEL_CAPACITY] VARCHAR(50) NOT NULL,
	[MILAGE] DECIMAL(5,2) NOT NULL,
    [DateOfCreation] DATETIME NOT NULL,
	[DateOfUpdation] DATETIME NOT NULL,
	[OtherData] VARCHAR(200) NULL
)`,(err)=>{
  if(err){
    console.log(err.message);
  }
    // if(!err){
    //   console.log("table created successfully");
    // }
  });
// i++;
let records = [req.body.CustomerName,req.body.PHONE, req.body.EMAIL,req.body.ADDRESS,req.body.RFID,
  req.body.VIN,req.body.MAC,req.body.topic,req.body.ACTIVE,req.body.VEHICLE_TYPE,req.body.FUEL_TYPE,
  req.body.FUEL_LEVEL,req.body.FUEL_CAPACITY,req.body.MILAGE,new Date().toLocaleString(),new Date().toLocaleString(),req.body.OtherData];
  let placeholders = records.map((value) => '?').join(',');
let sql = 'INSERT INTO user(CustomerName,PHONE,EMAIL,ADDRESS,RFID,VIN,MAC,topic,ACTIVE,VEHICLE_TYPE,FUEL_TYPE,FUEL_LEVEL,FUEL_CAPACITY,MILAGE,DateOfCreation,DateOfUpdation,OtherData) VALUES'+'('+placeholders+')';
 
// output the INSERT statement
console.log(sql);
 
db.run(sql, records, function(err) {
  if (err) {
    return console.error(err.message);
  }
  console.log(`Rows inserted ${this.changes}`);
});

  client.publish(req.body.topic,"ADDED to DB");
  res.status(201).send({"status":"ok"});
 // db.close();
});


async function loadCarData() {
    const client = await mongodb.MongoClient.connect(
      'mongodb://jignesh:jigneshk5@ds063789.mlab.com:63789/vue_express',
      {
        useNewUrlParser: true
      }
    );
  
    return client.db('vue_express').collection('carData');
  }
  
  module.exports = router;