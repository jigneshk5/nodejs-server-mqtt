var sqlite3 = require('sqlite3').verbose();
var userDB = new sqlite3.Database("./server/db/registrationDB.db", 
sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, 
function(err) { 
  if(!err){
  console.log('Connected to the Registration database.');
  }
  if (err) throw err;
});
module.exports = userDB;