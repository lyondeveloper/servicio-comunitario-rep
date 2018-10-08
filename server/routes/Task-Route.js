const express = require('express');
const router = express.Router();
const {verifyRole, verifyToken} = require('../middlewares/authentication');
const TaskController = require('../controllers/Task-Controller');

router.post('/api/users/tasks/create', verifyToken ,(req, res) => {

    TaskController.create(req, res);

});

module.exports = router;