const express = require('express');
var db = require('../../db');
const router = express.Router();

router.post('/',(req,res)=>{
    res.status(201).send({"success":true, "msg":"added"});
});
router.get('/',(req,res)=>{
    res.send('Connected');
})
module.exports = router;