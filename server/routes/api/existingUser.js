const express = require('express');
var db = require('../../db');
const router = express.Router();

//Get post


//Get user by id
router.get('/:id', (req, res) => {
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
router.post('/', (req, res) => {
    db.run(`CREATE TABLE IF NOT EXISTS user(  
      [CustomerId] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,  
      [CustomerName] VARCHAR(50) NOT NULL,
    [PHONE] VARCHAR(50) NOT NULL UNIQUE,
    [EMAIL] VARCHAR(50) NULL,
    [ADDRESS] VARCHAR(50) NOT NULL,
    [RFID] INTEGER NOT NULL UNIQUE,
      [VIN] INTEGER  NOT NULL, 
    [MAC] VARCHAR(50) NOT NULL,
      [TOPIC] VARCHAR(50) NOT NULL UNIQUE,
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
    //console.log(value);
  let sql = 'INSERT INTO user(CustomerName,PHONE,EMAIL,ADDRESS,RFID,VIN,MAC,topic,ACTIVE,VEHICLE_TYPE,FUEL_TYPE,FUEL_LEVEL,FUEL_CAPACITY,MILAGE,DateOfCreation,DateOfUpdation,OtherData,CompanyName) VALUES'+'('+placeholders+')';
  
  // output the INSERT statement
  console.log(sql);
  
  db.run(sql, records, function(err) {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    console.log(`Rows inserted ${this.changes}`);
    });
    //db.close();
  res.status(201).send({"success":true, "msg":"added"});
});




module.exports = router;