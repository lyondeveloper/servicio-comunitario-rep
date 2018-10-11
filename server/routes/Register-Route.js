const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middlewares/authentication');

const RegisterController = require('../controllers/register/Register-Controller');

router.post('/api/register/create', verifyToken,(req, res) => {

    RegisterController.create(req, res);

});

module.exports = router;