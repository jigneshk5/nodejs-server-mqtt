const express = require('express');
var qs = require('qs');
var assert = require('assert');
var Client = require('strong-pubsub');
var Adapter = require('strong-pubsub-mqtt');
var db = require('../../db');
const router = express.Router();
var client = new Client({host: 'test.mosquitto.org', port: 1883}, Adapter);

client.on('message', function(topic, msg) {
  console.log(topic, msg.toString()); // => movies birdman
 });

function rowObj(row){
  var x=[];
  var rowObj = Object.assign({},[row.cn,row.ph,row.mail,row.RFID,row.ad,row.VIN,
    row.MAC,row.topic,row.ACTIVE,row.vt,row.ft,row.fl,row.fc,row.MILAGE,row.dc,
    row.du,row.od,row.con]);
  x.push(rowObj);
  return x;
}
//Get post

router.get('/', async (req, res) => {
  var x=[];
  let a=[];
  let b = [];
  let data = [];
  var y = [];
  let j=0;
  let query = [req.query.name,req.query.phone,req.query.mail,req.query.rfid,
    req.query.address,req.query.vin,req.query.mac,req.query.topic,
    req.query.active,req.query.vt,req.query.ft,req.query.fl,req.query.fc,
    req.query.milage,req.query.dc,req.query.du,req.query.con];
  Array.prototype.checkAll = function(v) {
    var i, n = this.length;
    for (i = 0; i < n; ++i) {
        if(this[i] == v){
          return true;
        }
    }
  };
  function getSqlQuery(arr){
    let res = [];
    for(let i=0;i<arr.length;i++){
      if(arr[i]==0)
        res[i]='cn';
      if(arr[i]==1)
        res[i]='ph';
      if(arr[i]==2)
        res[i]='mail';
      if(arr[i]==3)
        res[i]='RFID';
      if(arr[i]==4)
        res[i]='ad';
      if(arr[i]==5)
        res[i]='VIN';
      if(arr[i]==6)
        res[i]='MAC';
      if(arr[i]==7)
        res[i]='topic';
      if(arr[i]==8)
        res[i]='ACTIVE';
      if(arr[i]==9)
        res[i]='vt';
      if(arr[i]==10)
        res[i]='ft';
      if(arr[i]==11)
        res[i]='fl';
      if(arr[i]==12)
        res[i]='fc';
      if(arr[i]==13)
        res[i]='MILAGE';
      if(arr[i]==14)
        res[i]='dc';
      if(arr[i]==15)
        res[i]='du';
      if(arr[i]==16)
        res[i]='con';
    }
    return res;
  }

  if(query[0] || query[1] || query[2] || query[3]|| query[4] || query[5]||query[6]
    || query[7] || query[8] || query[9] || query[10] || query[11] || query[12] || 
    query[13] || query[14] || query[15] || query[16]){
    
    for(let i=0;i<=16;i++){
      if(query[i]!=null){
        data[j]=query[i];
        a[j]=i;
        j++;
      }
    }
    b = getSqlQuery(a);
    let placeholders = b.map((value) => value+' = ? ').join('AND ');
    let sql = `SELECT CustomerName cn,PHONE ph,EMAIL mail,RFID,ADDRESS ad,VIN,MAC,
    topic,ACTIVE,VEHICLE_TYPE vt,FUEL_TYPE ft,FUEL_LEVEL fl,FUEL_CAPACITY fc,
    MILAGE,DateOfCreation dc,DateOfUpdation du,OtherData od,CompanyName con FROM 
    user WHERE ${placeholders}COLLATE NOCASE`;
    console.log(sql);
    console.log(data);
    db.get(sql, data, (err, row) => {
      if (row==null) {
        res.status(400).send("Data not in db");              //Bad Request
        return;
      }
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
        y = rowObj(row);
        res.send(y);
      });
    }
  else {
  let sql = `SELECT CustomerName cn,PHONE ph,EMAIL mail,RFID,ADDRESS ad,VIN,MAC,
  topic,ACTIVE,VEHICLE_TYPE vt,FUEL_TYPE ft,FUEL_LEVEL fl,FUEL_CAPACITY fc,
  MILAGE,DateOfCreation dc,DateOfUpdation du,OtherData od,CompanyName con 
  FROM user`;
    db.all(sql, [], (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
    rows.forEach((row) => {
    var rowObj = Object.assign({},[row.cn,row.ph,row.mail,row.RFID,row.ad,row.VIN,row.MAC,row.topic,row.ACTIVE,row.vt
      ,row.ft,row.fl,row.fc,row.MILAGE,row.dc,row.du,row.od,row.con]);
      x.push(rowObj);
      });
      res.send(x);
    });
  }
});

//Get user by id
router.get('/:id', async (req, res) => {
  var x=[];
  let CustomerId = req.params.id;
  let sql = `SELECT CustomerName cn,PHONE ph,EMAIL mail,RFID,ADDRESS ad,VIN,MAC,topic,ACTIVE,VEHICLE_TYPE vt,
  FUEL_TYPE ft,FUEL_LEVEL fl,FUEL_CAPACITY fc,MILAGE,DateOfCreation dc,DateOfUpdation du,OtherData od,CompanyName con FROM user
  WHERE CustomerId = ?`;
  db.get(sql, [CustomerId], (err, row) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
      var rowObj = Object.assign({},[row.cn,row.ph,row.mail,row.RFID,row.ad,row.VIN,row.MAC,row.topic,row.ACTIVE,row.vt
        ,row.ft,row.fl,row.fc,row.MILAGE,row.dc,row.du,row.od,row.con]);
      x.push(rowObj);
    res.send(x);
  });
});


//Add user
router.post('/', async (req, res) => {
  client.subscribe(req.body.topic);
  db.serialize(function() {
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
    [OtherData] VARCHAR(200) NULL,
    CompanyName VARCHAR(50) NULL
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
    req.body.FUEL_LEVEL,req.body.FUEL_CAPACITY,req.body.MILAGE,new Date().toLocaleString(),new Date().toLocaleString(),req.body.OtherData,req.body.CompanyName];
    let placeholders = records.map((value) => '?').join(',');
    console.log(value);
  let sql = 'INSERT INTO user(CustomerName,PHONE,EMAIL,ADDRESS,RFID,VIN,MAC,topic,ACTIVE,VEHICLE_TYPE,FUEL_TYPE,FUEL_LEVEL,FUEL_CAPACITY,MILAGE,DateOfCreation,DateOfUpdation,OtherData,CompanyName) VALUES'+'('+placeholders+')';
  
  // output the INSERT statement
  //console.log(sql);
  
  db.run(sql, records, function(err) {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    console.log(`Rows inserted ${this.changes}`);
    });
    //db.close();
  });
  client.publish(req.body.topic,"ADDED to DB");
  res.status(201).send({"success":true, "msg":"added"});

});

//Edit user by id
router.put('/edit/:id', async (req, res) => {
  let CustomerId = req.params.id;
  let records = ['CustomerName','PHONE','EMAIL','ADDRESS','RFID','VIN','MAC',
  'topic','ACTIVE','VEHICLE_TYPE','FUEL_TYPE','FUEL_LEVEL','FUEL_CAPACITY',
  'MILAGE','DateOfCreation','DateOfUpdation','OtherData','CompanyName'];
  let placeholders = records.map((value) => value+' = ? ').join(', ');
  let sql = 'UPDATE user SET '+placeholders+' WHERE CustomerId = ?';
  let data=[req.body.CustomerName,req.body.PHONE, req.body.EMAIL,req.body.ADDRESS,
    req.body.RFID,req.body.VIN,req.body.MAC,req.body.topic,req.body.ACTIVE,
    req.body.VEHICLE_TYPE,req.body.FUEL_TYPE,req.body.FUEL_LEVEL,
    req.body.FUEL_CAPACITY,req.body.MILAGE,new Date().toLocaleString(),
    new Date().toLocaleString(),req.body.OtherData,req.body.CompanyName, 
    CustomerId];
  db.run(sql,data, (err) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    res.status(200).send({"msg":"edited"});
  });
});


//Delete user by id
router.delete('/:id', async (req, res) => {
  let CustomerId = req.params.id;
  let sql = `DELETE FROM user WHERE CustomerId = ?`;
  db.run(sql, [CustomerId], (err) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    console.log(`Row(s) deleted ${this.changes}`);
    res.status(200).send({"msg":"deleted", changes: this.changes});
  });
});
// Default response for any other request
router.use(function(req, res){
  res.status(404).send({"msg":"404 NOT FOUND"});
});
  
  module.exports = router;