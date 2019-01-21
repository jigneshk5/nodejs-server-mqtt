const express = require('express');
var db = require('../../db');
const router = express.Router();
var iwlist = require('wireless-tools/iwlist');

iwlist.scan(':netsh wlan', function(err, networks) {
  console.log(networks);
});

iwlist.scan({ iface : 'wlan0', show_hidden : true }, function(err, networks) {
  console.log(networks);
});


router.get('/',(req,res)=>{
    res.send('WiFi List');
})
module.exports = router;