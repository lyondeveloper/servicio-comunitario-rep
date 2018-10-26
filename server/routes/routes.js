const express = require('express');
const app = express();

//Routes
app.use(require('./User-Route'));
app.use(require('./Login-Route'));
app.use(require('./Register-Route'));
app.use(require('./App-Routes'));

module.exports = app;