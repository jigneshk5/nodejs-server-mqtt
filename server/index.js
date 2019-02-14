const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
//Middleware

app.use(bodyParser.json());
app.use(cors());

const RegData = require('./routes/api/registration');
const test = require('./routes/api/test');
const entry = require('./routes/api/entry');
//const wifiList = require('./routes/api/wifiList');
//const wifiAP = require('./routes/api/wifiAP');
//const connectedWifi = require('./routes/api/connectedWifi');

app.use('/api/registration',RegData);
app.use('/api/test',test);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/',entry);
//app.use('/api/wifiList', wifiList);
//app.use('/api/wifiAP', wifiAP);
//app.use('/api/connectedWifi', connectedWifi);
// Default response for any other request
app.use(function(req, res){
    res.status(404).send({"msg":"404 NOT FOUND"});
  });

const port = process.env.PORT || 2000;

app.listen(2000, '0.0.0.0');
