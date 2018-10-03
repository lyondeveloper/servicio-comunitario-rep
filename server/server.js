//Exports
const express = require('express');
const app = express(); 
const http = require('http');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const colors = require('colors');

//Server configuration
const port = process.env.PORT || 3000;
const host = '127.0.0.1';
const server = http.createServer(app);
const publicPath = path.resolve(__dirname, '../public');

//middlewares
require('./routes/route');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(publicPath));

mongoose.connect("mongodb://localhost:27017/ServicioComunitarioDB", (err) => {

    if (err) {

        throw new Error('Unable to connect to MongoDB'.red);

    }

    console.log("Data base connected".green);

});

server.listen(port, host, () => {

    console.log(`Server running in port ${port}`.yellow);

});