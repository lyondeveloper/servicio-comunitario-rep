const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/Login-Controller');

router.post('/api/login', (req, res) => {

    LoginController.login(req, res);

});

module.exports = router;