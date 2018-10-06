const express = require('express');
const app = express();

//Routes
app.use(require('./User-Route'));
app.use(require('./login'));

module.exports = app;