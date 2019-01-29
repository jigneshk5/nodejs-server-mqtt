const express = require('express');
var db = require('../../db');
const router = express.Router();
var wifi = require("node-wifi");
var ssids=[];
// Initialize wifi module
// Absolutely necessary even to set interface to null
wifi.init({
  iface: null // network interface, choose a random wifi interface if set to null
});

// Scan networks
wifi.scan(function(err, networks) {
  var j=0;
  if (err) throw err;
   else {
     //console.log(networks);
     for(var i in networks){
      if(networks[i].ssid.substr(0,3) == 'obd')
        ssids[j]= networks[i].ssid;
        if(ssids[j]!= null){
          j++;
        }
     }
     console.log(ssids);
  }
});


router.get('/',(req,res)=>{
    res.send('WiFi List');
})
module.exports = router;