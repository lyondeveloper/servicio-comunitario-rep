const express = require('express');
const app = express();

//Routes
app.use(require('./user'));
app.use(require('./login'));

module.exports = app;