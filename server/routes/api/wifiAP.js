const express = require('express');
var db = require('../../db');
const router = express.Router();
var ssids=[];
var ifconfig = require('wireless-tools/ifconfig');
var hostapd = require('wireless-tools/hostapd');

var options = {
  channel: 6,
  driver: 'rtl871xdrv',
  hw_mode: 'g',
  interface: 'wlp1s0',
  ssid: 'RaspberryPi',
  wpa: 2,
  wpa_passphrase: 'raspberry'
};

hostapd.enable(options, function(err) {
    if(err)
        console.log(err);
    else
    console.log("HOTSPOT CREATED");
});
// ifconfig.status('wlp1s0', function(err, status) {
//     console.log(status);
//   });

router.get('/',(req,res)=>{
    res.send('WiFi List');
})
module.exports = router;