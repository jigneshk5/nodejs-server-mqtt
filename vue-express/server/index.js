const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//Middleware

app.use(bodyParser.json());
app.use(cors());

const carData = require('./routes/api/registration');

app.use('/api/registration',carData);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});