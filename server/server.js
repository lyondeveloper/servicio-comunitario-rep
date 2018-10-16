require('./config/config');
require('colors');
const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//middlewares
app.use(express.static(path.resolve(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('./routes/routes'));

const server = http.createServer(app);

mongoose.connect(process.env.MONGOURI, (err) => {

    if (err) {

        throw new Error('Unable to connect to MongoDB'.red);

    }

    console.log("Data base connected".green);

});

server.listen(process.env.PORT, () => {

    console.log(`Server running in port ${process.env.PORT}`.yellow);

});