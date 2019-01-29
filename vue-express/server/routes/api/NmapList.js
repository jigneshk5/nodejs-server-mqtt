const express = require('express');
var db = require('../../db');
const router = express.Router();
var wifi = require("node-wifi");
var ssids=[];
const nmap = require('libnmap');

nmap.discover(function(err, report) {
  if (err) throw new Error(err);

  for (var item in report) {
    console.log(JSON.stringify(report[item]));
  }
});
router.get('/',function(req,res){
    res.send('WiFi List');
})
module.exports = router;