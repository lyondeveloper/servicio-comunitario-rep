const express = require('express');
const router = express.Router();
const UserController = require('../controllers/User-Controller');
const {verifyRole, verifyToken} = require('../middlewares/authentication');

router.post('/api/users/create', [verifyRole, verifyToken], (req, res) => {

    UserController.create(req, res);

});

router.get('/api/users/getAll', [verifyToken], (req, res) => {

    UserController.getAll(req, res);

});

router.get('/api/users/getByName/:name', [verifyToken], (req, res) => {

    UserController.getByName(req, res);

});

router.get('/api/users/getByID/:identification', [verifyToken], (req, res) => {

    UserController.getByIdentification(req, res);

});

router.put('/api/users/:id', [verifyRole, verifyToken], (req, res) => {

    UserController.update(req, res);

});

router.delete('/api/users/delete/:id', [verifyRole, verifyToken], (req, res) => {

    UserController.delete(req, res);
    
});

module.exports = router;