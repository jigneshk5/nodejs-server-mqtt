const express = require('express');
var db = require('../../db');
var Wireless = require('wireless');
var connected = false;
const router = express.Router();
var iface = process.argv[2];
// The SSID of an open wireless network you'd like to connect to
var SSID = 'Lets Connect';

if (!iface) {
    console.log("Usage: " + process.argv[1] + " wlan0");
    return;
}

var wireless = new Wireless({
    iface: iface,
    updateFrequency: 12,
    vanishThreshold: 7,
});

console.log("[PROGRESS] Enabling wireless card...");

wireless.enable(function(error) {
    if (error) {
        console.log("[ FAILURE] Unable to enable wireless card. Quitting...");
        return;
    }

    console.log("[PROGRESS] Wireless card enabled.");
    console.log("[PROGRESS] Starting wireless scan...");

    wireless.start();
});
 // Found a new network
wireless.on('appear', function(network) {
    var quality = Math.floor(network.quality / 70 * 100);

    var ssid = network.ssid || '<HIDDEN>';

    var encryption_type = 'NONE';
    if (network.encryption_wep) {
        encryption_type = 'WEP';
    } else if (network.encryption_wpa && network.encryption_wpa2) {
        encryption_type = 'WPA&WPA2';
    } else if (network.encryption_wpa) {
        encryption_type = 'WPA';
    } else if (network.encryption_wpa2) {
        encryption_type = 'WPA2';
    }

    console.log("[  APPEAR] " + ssid + " [" + network.address + "] " + quality + "% " + network.strength + " dBm " + encryption_type);
});
router.get('/',(req,res)=>{
    res.send('WiFi List');
})
  
   module.exports = router;