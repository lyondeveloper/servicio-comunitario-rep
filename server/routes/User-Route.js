const express = require('express');
const router = express.Router();
const UserController = require('../controllers/User-Controller');

router.post('/api/users/create', (req, res) => {

    UserController.createUser(req, res);

});

router.get('/api/users/getAll', (req, res) => {

    UserController.getAll(req, res);

});

router.get('/api/users/getByName/:name', (req, res) => {

    UserController.getByName(req, res);

});

router.get('/api/users/getByID/:identification', (req, res) => {

    UserController.getByIdentification(req, res);

});

router.put('/api/users/:id', (req, res) => {

    UserController.update(req, res);

});

router.delete('/api/users/delete/:id', (req, res) => {

    UserController.delete(req, res);
    
});

module.exports = router;