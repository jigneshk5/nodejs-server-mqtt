const express = require('express');

var db = require('../../db');
const router = express.Router();
var topics = [];

router.get('/', (req, res) => {
  let i=0;
  db.all('SELECT REG_NUM FROM user', [], (err, rows) => {
    if (rows==null) {
      res.status(400).send("Data not in db");              //Bad Request
      return;
    }
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
          topics[i]= row.REG_NUM;
      i++;
    });
    res.send(topics);
  });
});

  module.exports = router;