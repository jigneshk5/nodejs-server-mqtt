const express = require('express');
const mongodb = require('mongodb');
var Client = require('strong-pubsub');
var Adapter = require('strong-pubsub-mqtt');
const router = express.Router();
let i=0;
var client = new Client({host: 'test.mosquitto.org', port: 1883}, Adapter);
var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database(':memory:');
 
// db.serialize(function() {
//   db.run("CREATE TABLE lorem (info TEXT)");
 
//   var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
//   for (var i = 0; i < 10; i++) {
//       stmt.run("Ipsum " + i);
//   }
//   stmt.finalize();
 
//   db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
//       console.log(row.id + ": " + row.info);
//   });
// });
//db.close();
client.on('message', function(topic, msg) {
  console.log(topic, msg.toString()); // => movies birdman
 });


//Get post

let userDB = new sqlite3.Database("./server/db/registrationDB.db", 
sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, 
(err) => { 
  if(!err){
  console.log('Connected to the Registration database.');
  }
});


//let stmt = userDB.run(`select * from langs`);


router.get('/', async (req, res) => {
    const carData = await loadCarData();
    res.send(await carData.find({}).toArray());
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
  if(i==5){
  userDB.run(`CREATE TABLE [Registration] (  
    [CustomerId] INTEGER PRIMARY KEY NOT NULL,  
    [CustomerName] VARCHAR(50) NOT NULL,
	[PHONE] VARCHAR(50) NOT NULL,
	[EMAIL] VARCHAR(50) NULL,
	[ADDRESS] VARCHAR(50) NOT NULL,
	[RFID] INTEGER NOT NULL,
    [VIN] INTEGER  NOT NULL, 
	[MAC] VARCHAR(50) NOT NULL,
    [TOPIC] VARCHAR(50) NOT NULL,
	[ACTIVE] INT NOT NULL,
    [VEHICLE_TYPE] VARCHAR(50) NOT NULL,
	[FUEL_TYPE] VARCHAR(50) NOT NULL,
	[FUEL_LEVEL] VARCHAR(50) NOT NULL,
	[FUEL_CAPACITY] VARCHAR(50) NOT NULL,
	[MILAGE] DECIMAL(5,2) NOT NULL,
    [DateOfCreation] DATE NOT NULL,
	[DateOfUpdation] DATE NOT NULL,
	[OtherData] VARCHAR(200) NULL
)`,(err)=>{
    console.log(err.message);
  });
}
i++;
let values = [i, req.body.CustomerName,req.body.PHONE, req.body.EMAIL,req.body.ADDRESS,req.body.RFID,
  req.body.VIN,req.body.MAC,req.body.TOPIC,req.body.ACTIVE,req.body.VEHICLE_TYPE,req.body.FUEL_TYPE,
  req.body.FUEL_LEVEL,req.body.FUEL_CAPACITY,req.body.MILAGE,new Date(),new Date(),req.body.OtherData];
  let placeholders = values.map((value) => '(?)').join(',');
let sql = 'INSERT INTO Registration VALUES ' + placeholders;
 
// output the INSERT statement
console.log(sql);
 
userDB.run(sql, languages, function(err) {
  if (err) {
    return console.error(err.message);
  }
  console.log(`Rows inserted ${this.changes}`);
});
//   userDB.each("SELECT name FROM LANGS", function(err, row) {
//     console.log(row.name);
// });
    // userDB.serialize(function(){

    // })

  client.publish(req.body.topic,"ADDED to DB");
  res.status(201).send({"status":"ok"});
  userDB.close();
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