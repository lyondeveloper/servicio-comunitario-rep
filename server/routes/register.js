const express = require('express');
const router = express.Router();
const passport = require('passport');

const Register = require('../controllers/RegisterController');

router.post('/api/register/create', passport.authenticate('jwt', {session: false}),(req, res) => {

    Register.create(req, res);

});

router.get('/api/register/getAll', passport.authenticate('jwt', {session: false}), (req, res) => {

    Register.getAll(req, res);

});

router.get('/api/register/getByName/:name', passport.authenticate('jwt', {session: false}), (req, res) => {
    
    Register.getByName(req, res);

});

router.get('/api/register/getAllByName/:name', passport.authenticate('jwt', {session: false}), (req, res) => {
    
    Register.getAllByName(req, res);

});

router.put('/api/register/update/:id', passport.authenticate('jwt', {session: false}), (req, res) => {

    Register.update(req, res);

});

router.delete('/api/register/delete/:id', passport.authenticate('jwt', {session: false}), (req, res) => {

    Register.delete(req, res);

});

module.exports = router;