const express = require('express');
const app = express();

//Routes
app.use(require('./users'));
app.use(require('./register'));
app.use(require('./app'));
app.use(require('./session'));

module.exports = app;