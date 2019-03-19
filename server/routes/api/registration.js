const express = require('express');
var db = require('../../db');
const router = express.Router();

// function rowObj(row){
//   var x=[];
//   var rowObj = Object.assign({},[row.cn,row.ph,row.mail,row.RFID,row.ad,row.VIN,
//     row.MAC,row.TOPIC,row.ACTIVE,row.vt,row.ft,row.fl,row.fc,row.MILAGE,row.dc,
//     row.du,row.od,row.con,row.CTEMP,row.MAF,row.RPM,row.SPEED]);
//   x.push(rowObj);
//   return x;
// }
//Get post

router.get('/', (req, res) => {
  var x=[];
  let a=[];
  let b = [];
  let data = [];
  var y = [];
  let j=0;
  let query = [req.query.name,req.query.phone,req.query.mail,req.query.address,
    req.query.rfid,req.query.reg_num,req.query.vin,req.query.mac,
    req.query.vm,req.query.ft,req.query.isobd,req.query.dc,req.query.du,req.query.fl,
    req.query.tc,req.query.rpm,req.query.speed,req.query.maf,req.query.ctemp,
    req.query.milage,req.query.od1,req.query.od2];
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
        res[i]='ad';
      if(arr[i]==4)
        res[i]='RFID';
      if(arr[i]==5)
        res[i]='REG_NUM';
      if(arr[i]==6)
        res[i]='VIN';
      if(arr[i]==7)
        res[i]='MAC';
      if(arr[i]==8)
        res[i]='vm';
      if(arr[i]==9)
        res[i]='ft';
      if(arr[i]==10)
        res[i]='IS_OBD';
      if(arr[i]==11)
        res[i]='dc';
      if(arr[i]==12)
        res[i]='du';
      if(arr[i]==13)
        res[i]='fl';
      if(arr[i]==14)
        res[i]='tc';
      if(arr[i]==15)
        res[i]='RPM';
      if(arr[i]==16)
        res[i]='SPEED';
      if(arr[i]==17)
        res[i]='MAF';
      if(arr[i]==18)
        res[i]='ctemp';
      if(arr[i]==19)
        res[i]='MILAGE';
      if(arr[i]==20)
        res[i]='od1';
      if(arr[i]==21)
        res[i]='od2';
    }
    return res;
  }

  if(query[0] || query[1] || query[2] || query[3]|| query[4] || query[5]||query[6]
    || query[7] || query[8] || query[9] || query[10] || query[11] || query[12] || 
    query[13] || query[14] || query[15] || query[16]|| query[17]|| query[18]|| query[19]
    || query[20] || query[21]){
    
    for(let i=0;i<=21;i++){
      if(query[i]!=null){
        data[j]=query[i];
        a[j]=i;
        j++;
      }
    }
    b = getSqlQuery(a);
    let placeholders = b.map((value) => value+' = ? ').join('AND ');
    let sql = `SELECT CustomerId id,CustomerName cn,PHONE ph,EMAIL mail,ADDRESS ad,RFID,
    REG_NUM,VIN,MAC,VEHICLE_MAKE vm,FUEL_TYPE ft,IS_OBD,DateOfCreation dc,
    DateOfUpdation du,FUEL_LEVEL fl,TANK_CAPACITY tc,RPM,SPEED,MAF,COOLANT_TEMP ctemp,
    MILAGE,OtherData1 od1,OtherData2 od2 FROM user WHERE ${placeholders}COLLATE NOCASE`;
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
        var rowObj = Object.assign({},{'Customer id':row.id},{'Customer/Company Name':row.cn},
        {'phone':row.ph},{'mail':row.mail},{'Address':row.ad},{'Rfid':row.RFID},
        {'Registration Number':row.REG_NUM},{'VIN':row.VIN},{'MAC':row.MAC},
        {'Vehicle Make':row.vm},{'Fuel type':row.ft},{'IS_OBD':row.IS_OBD},
        {'DateOfCreation':row.dc},{'DateOfUpdation':row.du},{'Fuel Level':row.fl},
        {'Tank Capacity':row.tc},{'RPM':row.RPM},{'SPEED':row.SPEED},{'Mass Air Flow':row.MAF},
        {'Coolant Temperature':row.ctemp},{'Milage':row.MILAGE},{'OtherData1':row.od1},
        {'OtherData2':row.od2});
          x.push(rowObj);
          });
          res.send(x);
      });
    }
  else {
  let sql = `SELECT CustomerId id,CustomerName cn,PHONE ph,EMAIL mail,ADDRESS ad,RFID,
  REG_NUM,VIN,MAC,VEHICLE_MAKE vm,FUEL_TYPE ft,IS_OBD,DateOfCreation dc,
  DateOfUpdation du,FUEL_LEVEL fl,TANK_CAPACITY tc,RPM,SPEED,MAF,COOLANT_TEMP ctemp,
  MILAGE,OtherData1 od1,OtherData2 od2 FROM user`;
    db.all(sql, [], (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
    rows.forEach((row) => {
    var rowObj = Object.assign({},{'Customer id':row.id},{'Customer/Company Name':row.cn},
    {'phone':row.ph},{'mail':row.mail},{'Address':row.ad},{'Rfid':row.RFID},
    {'Registration Number':row.REG_NUM},{'VIN':row.VIN},{'MAC':row.MAC},
    {'Vehicle Make':row.vm},{'Fuel type':row.ft},{'IS_OBD':row.IS_OBD},
    {'DateOfCreation':row.dc},{'DateOfUpdation':row.du},{'Fuel Level':row.fl},
    {'Tank Capacity':row.tc},{'RPM':row.RPM},{'SPEED':row.SPEED},{'Mass Air Flow':row.MAF},
    {'Coolant Temperature':row.ctemp},{'Milage':row.MILAGE},{'OtherData1':row.od1},
    {'OtherData2':row.od2});
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
  let sql = `SELECT CustomerId id,CustomerName cn,PHONE ph,EMAIL mail,ADDRESS ad,RFID,
  REG_NUM,VIN,MAC,VEHICLE_MAKE vm,FUEL_TYPE ft,IS_OBD,DateOfCreation dc,
  DateOfUpdation du,FUEL_LEVEL fl,TANK_CAPACITY tc,RPM,SPEED,MAF,COOLANT_TEMP ctemp,
  MILAGE,OtherData1 od1,OtherData2 od2 FROM user WHERE CustomerId = ?`;
  db.get(sql, [CustomerId], (err, row) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    }
    var rowObj = Object.assign({},{'Customer id':row.id},{'Customer/Company Name':row.cn},
    {'phone':row.ph},{'mail':row.mail},{'Address':row.ad},{'Rfid':row.RFID},
    {'Registration Number':row.REG_NUM},{'VIN':row.VIN},{'MAC':row.MAC},
    {'Vehicle Make':row.vm},{'Fuel type':row.ft},{'IS_OBD':row.IS_OBD},
    {'DateOfCreation':row.dc},{'DateOfUpdation':row.du},{'Fuel Level':row.fl},
    {'Tank Capacity':row.tc},{'RPM':row.RPM},{'SPEED':row.SPEED},{'Mass Air Flow':row.MAF},
    {'Coolant Temperature':row.ctemp},{'Milage':row.MILAGE},{'OtherData1':row.od1},
    {'OtherData2':row.od2});

    x.push(rowObj);
    res.send(x);
  });
});


//Add user
router.post('/', (req, res) => {
    db.run(`CREATE TABLE IF NOT EXISTS user(  
    [CustomerId] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,  
    [CustomerName] VARCHAR(50) NOT NULL,
    [PHONE] VARCHAR(50) NOT NULL,
    [EMAIL] VARCHAR(50) NOT NULL,
    [ADDRESS] VARCHAR(50),
    [RFID] VARCHAR(50) NOT NULL UNIQUE,
    [REG_NUM] VARCHAR(50) NOT NULL UNIQUE,
    [VIN] VARCHAR(50) NOT NULL UNIQUE, 
    [MAC] VARCHAR(50) NULL,
    [VEHICLE_MAKE] VARCHAR(50),
    [FUEL_TYPE] VARCHAR(50) NOT NULL,
    [IS_OBD] VARCHAR(50) NOT NULL,
    [DateOfCreation] DATETIME NOT NULL,
    [DateOfUpdation] DATETIME NOT NULL,
    [FUEL_LEVEL] VARCHAR(50) NULL,
    [TANK_CAPACITY] VARCHAR(50) NULL,
    [RPM] VARCHAR(50) NULL,
    [SPEED] VARCHAR(50) NULL,
    [MAF] VARCHAR(50) NULL,
    [COOLANT_TEMP] VARCHAR(50) NULL,
    [MILAGE] VARCHAR(50) NULL,
    [OtherData1] VARCHAR(50) NULL,
    [OtherData2] VARCHAR(50) NULL
  )`,(err)=>{
    if(err){
      console.log(err.message);
    }
      // if(!err){
      //   console.log("table created successfully");
      // }
    });
  // i++;
  let records = [req.body.CustomerName,req.body.PHONE, req.body.EMAIL,req.body.ADDRESS,
    req.body.RFID,req.body.REG_NUM,req.body.VIN,req.body.MAC,
    req.body.VEHICLE_MAKE,req.body.FUEL_TYPE,req.body.IS_OBD,new Date().toLocaleString(),
    new Date().toLocaleString(),req.body.FUEL_LEVEL,req.body.TANK_CAPACITY,
    req.body.RPM,req.body.SPEED,req.body.MAF,req.body.COOLANT_TEMP,req.body.MILAGE,
    req.body.OtherData1,req.body.OtherData2];
    let placeholders = records.map((value) => '?').join(',');
    //console.log(value);
 
  let sql = `INSERT INTO user(CustomerName,PHONE,EMAIL,ADDRESS,RFID,REG_NUM,VIN,MAC,
    VEHICLE_MAKE,FUEL_TYPE,IS_OBD,DateOfCreation,DateOfUpdation,FUEL_LEVEL,TANK_CAPACITY,
    RPM,SPEED,MAF,COOLANT_TEMP,MILAGE,OtherData1,OtherData2) VALUES`+'('+placeholders+')';
  
  // output the INSERT statement
  console.log(sql);
  
  db.run(sql, records, function(err) {
    if (err) {
      console.log(err.message);
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
        res[i]='REG_NUM';
      if(arr[i]==6)
        res[i]='VIN';
      if(arr[i]==7)
        res[i]='MAC';
      if(arr[i]==8)
        res[i]='VEHICLE_MAKE';
      if(arr[i]==9)
        res[i]='FUEL_TYPE';
      if(arr[i]==10)
        res[i]='IS_OBD';
      if(arr[i]==11)
        res[i]='DateOfCreation';
      if(arr[i]==12)
        res[i]='DateOfUpdation';
      if(arr[i]==13)
        res[i]='FUEL_LEVEL';
      if(arr[i]==14)
        res[i]='TANK_CAPACITY';
      if(arr[i]==15)
        res[i]='RPM';
      if(arr[i]==16)
        res[i]='SPEED';
      if(arr[i]==17)
        res[i]='MAF';
      if(arr[i]==18)
        res[i]='COOLANT_TEMP';
      if(arr[i]==19)
        res[i]='MILAGE';
      if(arr[i]==20)
        res[i]='OtherData1';
      if(arr[i]==21)
        res[i]='OtherData2';
    }
    return res;
  }

  let query=[req.body.CustomerName,req.body.PHONE, req.body.EMAIL,req.body.ADDRESS,
    req.body.RFID,req.body.REG_NUM,req.body.VIN,req.body.MAC,
    req.body.VEHICLE_MAKE,req.body.FUEL_TYPE,req.body.IS_OBD,new Date().toLocaleString(),
    new Date().toLocaleString(),req.body.FUEL_LEVEL,req.body.TANK_CAPACITY,
    req.body.RPM,req.body.SPEED,req.body.MAF,req.body.COOLANT_TEMP,req.body.MILAGE,
    req.body.OtherData1,req.body.OtherData2];
    
    for(let i=0;i<=21;i++){
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