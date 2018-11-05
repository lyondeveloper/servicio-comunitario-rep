const express = require('express');
const router = express.Router();
const User = require('../controllers/UserController');
const passport = require('passport');

router.post('/api/users/create', (req, res) => {

    User.create(req, res);

});

router.post('/api/users/login', (req, res) => {

    User.login(req, res);

});

router.get('/api/users/getAll', passport.authenticate('jwt', {session: false}), (req, res) => {

    User.getAll(req, res);

});

router.get('/api/users/getByName/:name', passport.authenticate('jwt', {session: false}), (req, res) => {

    User.getByName(req, res);

});

router.get('/api/users/getByID/:identification', passport.authenticate('jwt', {session: false}), (req, res) => {

    User.getByIdentification(req, res);

});

router.put('/api/users/:id', passport.authenticate('jwt', {session: false}), (req, res) => {

    User.update(req, res);

});

router.delete('/api/users/delete/:id', passport.authenticate('jwt', {session: false}), (req, res) => {

    User.delete(req, res);

});

module.exports = router;