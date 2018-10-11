const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middlewares/authentication');
const TaskController = require('../controllers/Task-Controller');

router.post('/api/user/tasks/create', verifyToken ,(req, res) => {

    TaskController.create(req, res);

});

router.get('/api/user/tasks/get', verifyToken, (req, res) => {

    TaskController.get(req, res);

});

router.get('/api/user/tasks/getByDescription/:description', (req, res) => {

    TaskController.getByDescription(req, res);

});

router.put('/api/user/tasks/update/:id', (req, res) => {

    TaskController.update(req, res);

});

router.delete('/api/user/tasks/delete/:id', (req, res) => {

    TaskController.delete(req, res);

});

module.exports = router;