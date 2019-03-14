const express = require('express');
var db = require('../../db');
const router = express.Router();

function rowObj(row){
  var x=[];
  var rowObj = Object.assign({},[row.cn,row.ph,row.mail,row.RFID,row.ad,row.VIN,
    row.MAC,row.topic,row.ACTIVE,row.vt,row.ft,row.fl,row.fc,row.MILAGE,row.dc,
    row.du,row.od,row.con]);
  x.push(rowObj);
  return x;
}
//Get post

router.get('/', (req, res) => {
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
    let sql = `SELECT CustomerId id,CustomerName cn,PHONE ph,EMAIL mail,RFID,ADDRESS ad,VIN,MAC,
    topic,ACTIVE,VEHICLE_TYPE vt,FUEL_TYPE ft,FUEL_LEVEL fl,FUEL_CAPACITY fc,
    MILAGE,DateOfCreation dc,DateOfUpdation du,OtherData od,CompanyName con FROM 
    user WHERE ${placeholders}COLLATE NOCASE`;
    console.log(sql);
    console.log(data);
    db.all(sql, data, (err, rows) => {
      if (rows==null) {
        res.status(400).send("Data not in db");              //Bad Request
        return;
      }
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      rows.forEach((row) => {
        var rowObj = Object.assign({},{'Customer id':row.id},{'Customer Name':row.cn},{'phone':row.ph},
        {'mail':row.mail},{'Rfid':row.RFID},{'Address':row.ad},{'VIN':row.VIN},{'MAC':row.MAC},{'TOPIC':row.topic},
        {'Active State':row.ACTIVE},{'Vehicle type':row.vt},{'Fuel type':row.ft},{'Fuel Level':row.fl},
        {'Fuel capacity':row.fc},{'Milage':row.MILAGE},{'DateOfCreation':row.dc},{'DateOfUpdation':row.du},
        {'OtherData':row.od},{'CompanyName':row.con});
          x.push(rowObj);
          });
          res.send(x);
      });
    }
  else {
  let sql = `SELECT CustomerId id,CustomerName cn,PHONE ph,EMAIL mail,RFID,ADDRESS ad,VIN,MAC,
  topic,ACTIVE,VEHICLE_TYPE vt,FUEL_TYPE ft,FUEL_LEVEL fl,FUEL_CAPACITY fc,
  MILAGE,DateOfCreation dc,DateOfUpdation du,OtherData od,CompanyName con 
  FROM user`;
    db.all(sql, [], (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
    rows.forEach((row) => {
    var rowObj = Object.assign({},{'Customer id':row.id},{'Customer Name':row.cn},{'phone':row.ph},
    {'mail':row.mail},{'Rfid':row.RFID},{'Address':row.ad},{'VIN':row.VIN},{'MAC':row.MAC},{'TOPIC':row.topic},
    {'Active State':row.ACTIVE},{'Vehicle type':row.vt},{'Fuel type':row.ft},{'Fuel Level':row.fl},
    {'Fuel capacity':row.fc},{'Milage':row.MILAGE},{'DateOfCreation':row.dc},{'DateOfUpdation':row.du},
    {'OtherData':row.od},{'CompanyName':row.con});
      x.push(rowObj);
      });
      res.send(x);
    });
  }
});

//Get user by id
router.get('/:id', (req, res) => {
  var x=[];
  let CustomerId = req.params.id;
  let sql = `SELECT CustomerId id,CustomerName cn,PHONE ph,EMAIL mail,RFID,ADDRESS ad,VIN,MAC,topic,ACTIVE,VEHICLE_TYPE vt,
  FUEL_TYPE ft,FUEL_LEVEL fl,FUEL_CAPACITY fc,MILAGE,DateOfCreation dc,DateOfUpdation du,OtherData od,CompanyName con FROM user
  WHERE CustomerId = ?`;
  db.get(sql, [CustomerId], (err, row) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    var rowObj = Object.assign({},{'Customer id':row.id},{'Customer Name':row.cn},{'phone':row.ph},
    {'mail':row.mail},{'Rfid':row.RFID},{'Address':row.ad},{'VIN':row.VIN},{'MAC':row.MAC},{'TOPIC':row.topic},
    {'Active State':row.ACTIVE},{'Vehicle type':row.vt},{'Fuel type':row.ft},{'Fuel Level':row.fl},
    {'Fuel capacity':row.fc},{'Milage':row.MILAGE},{'DateOfCreation':row.dc},{'DateOfUpdation':row.du},
    {'OtherData':row.od},{'CompanyName':row.con});
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
    else{
      console.log(`Rows inserted ${this.changes}`);
      res.status(200).send({"success":true, "msg":"added"});
    }
    });
    //db.close();
});

//Edit user by id
router.put('/edit/:id', (req, res) => {

  let j=0;
  let data=[];
  let a=[];
  let b=[];
  function getSqlQuery(arr){
    let res = [];
    for(let i=0;i<arr.length;i++){
      if(arr[i]==0)
        res[i]='CustomerName';
      if(arr[i]==1)
        res[i]='PHONE';
      if(arr[i]==2)
        res[i]='EMAIL';
      if(arr[i]==3)
        res[i]='ADDRESS';
      if(arr[i]==4)
        res[i]='RFID';
      if(arr[i]==5)
        res[i]='VIN';
      if(arr[i]==6)
        res[i]='MAC';
      if(arr[i]==7)
        res[i]='topic';
      if(arr[i]==8)
        res[i]='ACTIVE';
      if(arr[i]==9)
        res[i]='VEHICLE_TYPE';
      if(arr[i]==10)
        res[i]='FUEL_TYPE';
      if(arr[i]==11)
        res[i]='FUEL_LEVEL';
      if(arr[i]==12)
        res[i]='FUEL_CAPACITY';
      if(arr[i]==13)
        res[i]='MILAGE';
      if(arr[i]==14)
        res[i]='DateOfCreation';
      if(arr[i]==15)
        res[i]='DateOfUpdation';
      if(arr[i]==16)
        res[i]='OtherData';
      if(arr[i]==17)
        res[i]='CompanyName';
    }
    return res;
  }

  let query=[req.body.CustomerName,req.body.PHONE, req.body.EMAIL,req.body.ADDRESS,
    req.body.RFID,req.body.VIN,req.body.MAC,req.body.topic,req.body.ACTIVE,
    req.body.VEHICLE_TYPE,req.body.FUEL_TYPE,req.body.FUEL_LEVEL,
    req.body.FUEL_CAPACITY,req.body.MILAGE,new Date().toLocaleString(),
    new Date().toLocaleString(),req.body.OtherData,req.body.CompanyName];
    
    for(let i=0;i<=17;i++){
      if(query[i]!=null){
        data[j]=query[i];
        a[j]=i;
        j++;
      }
    }
    b = getSqlQuery(a);
    let CustomerId = req.params.id;
    data[j]=CustomerId;
    let placeholders = b.map((value) => value+' = ? ').join(', ');
    let sql = 'UPDATE user SET '+placeholders+' WHERE CustomerId = ?';
    console.log(sql);
    console.log(data);
    db.run(sql,data, (err) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.status(200).send({"msg":"edited"});
  });
});

//Delete user by id
router.delete('/:id', (req, res) => {
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

module.exports = router;