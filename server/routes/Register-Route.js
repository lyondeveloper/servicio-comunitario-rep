const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middlewares/authentication');

const RegisterController = require('../controllers/Register-Controller');

router.post('/api/register/create', verifyToken,(req, res) => {

    RegisterController.create(req, res);

});

router.get('/api/register/getAll', verifyToken, (req, res) => {

    RegisterController.getAll(req, res);

});

router.get('/api/register/getByName/:name', verifyToken, (req, res) => {
    
    RegisterController.getByName(req, res);

});

router.put('/api/register/update/:id', verifyToken, (req, res) => {

    RegisterController.update(req, res);

});

router.delete('/api/register/delete/:id', verifyToken, (req, res) => {

    RegisterController.delete(req, res);

});

module.exports = router;