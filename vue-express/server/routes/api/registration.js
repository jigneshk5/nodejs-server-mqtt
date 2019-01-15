const express = require('express');
const mongodb = require('mongodb');
var Client = require('strong-pubsub');
var Adapter = require('strong-pubsub-mqtt');

const router = express.Router();

var client = new Client({host: 'test.mosquitto.org', port: 1883}, Adapter);
// var sqlite3 = require('sqlite3').verbose();
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

router.get('/', async (req, res) => {
    const carData = await loadCarData();
    res.send(await carData.find({}).toArray());
  });
//Add post
router.post('/', async (req, res) => {
  const carData = await loadCarData();
  await carData.insertOne({
    topic: req.body.topic,
    mac : req.body.mac,
    vin: req.body.carnum
  })
  client.subscribe(req.body.topic);
  res.status(201).send();
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