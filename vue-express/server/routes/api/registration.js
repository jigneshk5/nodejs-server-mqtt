const express = require('express');
const mongodb = require('mongodb');
var Client = require('strong-pubsub');
var Adapter = require('strong-pubsub-mqtt');
const router = express.Router();

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
let i=1;

userDB.run('CREATE TABLE langs(name text)',(err)=>{
  console.log(err.message);
});

userDB.run(`INSERT INTO langs VALUES(?)`, ['jhbjh'],function(err) {
  if (err) {
    return console.log(err.message);
  }
  // get the last insert id
  console.log(`A row has been inserted with rowid ${this.lastID}`);
});
let stmt = userDB.run(`select * from langs`);
userDB.each("SELECT name FROM LANGS", function(err, row) {
        console.log(row.name);
    });
userDB.close();

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
  // var customDB = new sqlite3.Database("./custom.db", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE);


    // userDB.serialize(function(){

    // })

  client.publish(req.body.topic,"ADDED to DB");
  res.status(201).send({"status":"ok"});
  db.close();
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