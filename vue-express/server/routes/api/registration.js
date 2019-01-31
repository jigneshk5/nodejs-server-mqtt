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
  var y;
  let query = [req.query.name,req.query.phone,req.query.mail,req.query.rfid,
    req.query.address,req.query.vin,req.query.mac,req.query.topic,
    req.query.active,req.query.vt,req.query.ft,req.query.fl,req.query.fc,
    req.query.milage,req.query.dc,req.query.du,req.query.con];

  // if(query[0] && query[1]){
  //   let sql = `SELECT CustomerName cn,PHONE ph,EMAIL mail,RFID,ADDRESS ad,VIN,MAC,topic,ACTIVE,VEHICLE_TYPE vt,
  //   FUEL_TYPE ft,FUEL_LEVEL fl,FUEL_CAPACITY fc,MILAGE,DateOfCreation dc,DateOfUpdation du,OtherData od,CompanyName con FROM user
  //   WHERE cn = ? AND ph = ? COLLATE NOCASE`;
  //   db.get(sql, [query[0],query[1]], (err, row) => {
  //     if (err) {
  //       res.status(400).json({"error":err.message});
  //       return;
  //     }
  //       y = rowObj(row);
  //       res.send(y);
  //     });
  //   }

  if(query[0]){
    let sql = `SELECT CustomerName cn,PHONE ph,EMAIL mail,RFID,ADDRESS ad,VIN,MAC,topic,ACTIVE,VEHICLE_TYPE vt,
    FUEL_TYPE ft,FUEL_LEVEL fl,FUEL_CAPACITY fc,MILAGE,DateOfCreation dc,DateOfUpdation du,OtherData od,CompanyName con FROM user
    WHERE CustomerName = ? COLLATE NOCASE`;
    db.get(sql, ['Samuel'], (err, row) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
        y = rowObj(row);
        res.send(y);
      });
    }
  else if(query[1]){
    let sql = `SELECT CustomerName cn,PHONE ph,EMAIL mail,RFID,ADDRESS ad,VIN,MAC,topic,ACTIVE,VEHICLE_TYPE vt,
    FUEL_TYPE ft,FUEL_LEVEL fl,FUEL_CAPACITY fc,MILAGE,DateOfCreation dc,DateOfUpdation du,OtherData od,CompanyName con FROM user
    WHERE PHONE = ? COLLATE NOCASE`;
    db.get(sql, [query[1]], (err, row) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      y = rowObj(row);
      res.send(y);
      });
    }
  else if(query[2]){
    let sql = `SELECT CustomerName cn,PHONE ph,EMAIL mail,RFID,ADDRESS ad,VIN,MAC,topic,ACTIVE,VEHICLE_TYPE vt,
    FUEL_TYPE ft,FUEL_LEVEL fl,FUEL_CAPACITY fc,MILAGE,DateOfCreation dc,DateOfUpdation du,OtherData od,CompanyName con FROM user
    WHERE EMAIL = ? COLLATE NOCASE`;
    db.get(sql, [query[2]], (err, row) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      y = rowObj(row);
      res.send(y);
      });
    }
  else if(query[3]){
    let sql = `SELECT CustomerName cn,PHONE ph,EMAIL mail,RFID,ADDRESS ad,VIN,MAC,topic,ACTIVE,VEHICLE_TYPE vt,
    FUEL_TYPE ft,FUEL_LEVEL fl,FUEL_CAPACITY fc,MILAGE,DateOfCreation dc,DateOfUpdation du,OtherData od,CompanyName con FROM user
    WHERE RFID = ? COLLATE NOCASE`;
    db.get(sql, [query[3]], (err, row) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      y = rowObj(row);
      res.send(y);
      });
    }
  else if(query[4]){
  let sql = `SELECT CustomerName cn,PHONE ph,EMAIL mail,RFID,ADDRESS ad,VIN,MAC,topic,ACTIVE,VEHICLE_TYPE vt,
  FUEL_TYPE ft,FUEL_LEVEL fl,FUEL_CAPACITY fc,MILAGE,DateOfCreation dc,DateOfUpdation du,OtherData od,CompanyName con FROM user
  WHERE ad = ? COLLATE NOCASE`;
  db.get(sql, [query[4]], (err, row) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    y = rowObj(row);
      res.send(y);
    });
  }
  else if(query[5]){
    let sql = `SELECT CustomerName cn,PHONE ph,EMAIL mail,RFID,ADDRESS ad,VIN,MAC,topic,ACTIVE,VEHICLE_TYPE vt,
    FUEL_TYPE ft,FUEL_LEVEL fl,FUEL_CAPACITY fc,MILAGE,DateOfCreation dc,DateOfUpdation du,OtherData od,CompanyName con FROM user
    WHERE VIN = ? COLLATE NOCASE`;
    db.get(sql, [query[5]], (err, row) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      y = rowObj(row);
      res.send(y);
      });
    }
  else if(query[6]){
  let sql = `SELECT CustomerName cn,PHONE ph,EMAIL mail,RFID,ADDRESS ad,VIN,MAC,topic,ACTIVE,VEHICLE_TYPE vt,
  FUEL_TYPE ft,FUEL_LEVEL fl,FUEL_CAPACITY fc,MILAGE,DateOfCreation dc,DateOfUpdation du,OtherData od,CompanyName con FROM user
  WHERE MAC = ? COLLATE NOCASE`;
  db.get(sql, [query[6]], (err, row) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    y = rowObj(row);
      res.send(y);
    });
  }
else if(query[7]){
  let sql = `SELECT CustomerName cn,PHONE ph,EMAIL mail,RFID,ADDRESS ad,VIN,MAC,topic,ACTIVE,VEHICLE_TYPE vt,
  FUEL_TYPE ft,FUEL_LEVEL fl,FUEL_CAPACITY fc,MILAGE,DateOfCreation dc,DateOfUpdation du,OtherData od,CompanyName con FROM user
  WHERE topic = ? COLLATE NOCASE`;
  db.get(sql, [query[7]], (err, row) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    y = rowObj(row);
      res.send(y);
    });
  }
  else if(query[8]){
    let sql = `SELECT CustomerName cn,PHONE ph,EMAIL mail,RFID,ADDRESS ad,VIN,MAC,topic,ACTIVE,VEHICLE_TYPE vt,
    FUEL_TYPE ft,FUEL_LEVEL fl,FUEL_CAPACITY fc,MILAGE,DateOfCreation dc,DateOfUpdation du,OtherData od,CompanyName con FROM user
    WHERE ACTIVE = ? COLLATE NOCASE`;
    db.get(sql, [query[8]], (err, row) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      y = rowObj(row);
      res.send(y);
      });
    }
  else if(query[9]){
    let sql = `SELECT CustomerName cn,PHONE ph,EMAIL mail,RFID,ADDRESS ad,VIN,MAC,topic,ACTIVE,VEHICLE_TYPE vt,
    FUEL_TYPE ft,FUEL_LEVEL fl,FUEL_CAPACITY fc,MILAGE,DateOfCreation dc,DateOfUpdation du,OtherData od,CompanyName con FROM user
    WHERE vt = ? COLLATE NOCASE`;
    db.get(sql, [query[9]], (err, row) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      y = rowObj(row);
      res.send(y);
      });
    }
  else if(query[10]){
    let sql = `SELECT CustomerName cn,PHONE ph,EMAIL mail,RFID,ADDRESS ad,VIN,MAC,topic,ACTIVE,VEHICLE_TYPE vt,
    FUEL_TYPE ft,FUEL_LEVEL fl,FUEL_CAPACITY fc,MILAGE,DateOfCreation dc,DateOfUpdation du,OtherData od,CompanyName con FROM user
    WHERE ft = ? COLLATE NOCASE`;
    db.get(sql, [query[10]], (err, row) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      y = rowObj(row);
      res.send(y);
      });
    }
  else if(query[11]){
    let sql = `SELECT CustomerName cn,PHONE ph,EMAIL mail,RFID,ADDRESS ad,VIN,MAC,topic,ACTIVE,VEHICLE_TYPE vt,
    FUEL_TYPE ft,FUEL_LEVEL fl,FUEL_CAPACITY fc,MILAGE,DateOfCreation dc,DateOfUpdation du,OtherData od,CompanyName con FROM user
    WHERE fl = ? COLLATE NOCASE`;
    db.get(sql, [query[11]], (err, row) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      y = rowObj(row);
      res.send(y);
      });
    }
  else if(query[12]){
    let sql = `SELECT CustomerName cn,PHONE ph,EMAIL mail,RFID,ADDRESS ad,VIN,MAC,topic,ACTIVE,VEHICLE_TYPE vt,
    FUEL_TYPE ft,FUEL_LEVEL fl,FUEL_CAPACITY fc,MILAGE,DateOfCreation dc,DateOfUpdation du,OtherData od,CompanyName con FROM user
    WHERE fc = ? COLLATE NOCASE`;
    db.get(sql, [query[12]], (err, row) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      y = rowObj(row);
      res.send(y);
      });
    }
  else if(query[13]){
    let sql = `SELECT CustomerName cn,PHONE ph,EMAIL mail,RFID,ADDRESS ad,VIN,MAC,topic,ACTIVE,VEHICLE_TYPE vt,
    FUEL_TYPE ft,FUEL_LEVEL fl,FUEL_CAPACITY fc,MILAGE,DateOfCreation dc,DateOfUpdation du,OtherData od,CompanyName con FROM user
    WHERE MILAGE = ? COLLATE NOCASE`;
    db.get(sql, [query[13]], (err, row) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      y = rowObj(row);
      res.send(y);
      });
    }
    else if(query[14] && query[14].substr(0,9)){
      let sql = `SELECT CustomerName cn,PHONE ph,EMAIL mail,RFID,ADDRESS ad,VIN,MAC,topic,ACTIVE,VEHICLE_TYPE vt,
      FUEL_TYPE ft,FUEL_LEVEL fl,FUEL_CAPACITY fc,MILAGE,DateOfCreation dc,DateOfUpdation du,OtherData od,CompanyName con FROM user
      WHERE dc = ? COLLATE NOCASE`;
      db.get(sql, [query[14]], (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        y = rowObj(row);
        res.send(y);
        });
      }
  else if(query[15] && query[15].substr(0,9)){
    let sql = `SELECT CustomerName cn,PHONE ph,EMAIL mail,RFID,ADDRESS ad,VIN,MAC,topic,ACTIVE,VEHICLE_TYPE vt,
    FUEL_TYPE ft,FUEL_LEVEL fl,FUEL_CAPACITY fc,MILAGE,DateOfCreation dc,DateOfUpdation du,OtherData od,CompanyName con FROM user
    WHERE du like = ? COLLATE NOCASE`;
    db.get(sql, [query[15]], (err, row) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      y = rowObj(row);
      res.send(y);
      });
    }
  else if(query[16]){
    let sql = `SELECT CustomerName cn,PHONE ph,EMAIL mail,RFID,ADDRESS ad,VIN,MAC,topic,ACTIVE,VEHICLE_TYPE vt,
    FUEL_TYPE ft,FUEL_LEVEL fl,FUEL_CAPACITY fc,MILAGE,DateOfCreation dc,DateOfUpdation du,OtherData od,CompanyName con FROM user
    WHERE con = ? COLLATE NOCASE`;
    db.get(sql, [query[16]], (err, row) => {
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
  // const carData = await loadCarData();
  // res.send(await carData.find({}).toArray());
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