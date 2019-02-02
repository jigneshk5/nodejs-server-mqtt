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
//const wifiList = require('./routes/api/wifiList');
//const wifiAP = require('./routes/api/wifiAP');
//const connectedWifi = require('./routes/api/connectedWifi');

app.use('/api/registration',RegData);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//app.use('/api/wifiList', wifiList);
//app.use('/api/wifiAP', wifiAP);
//app.use('/api/connectedWifi', connectedWifi);


const port = process.env.PORT || 2000;

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});
