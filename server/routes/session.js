const express = require('express');
const router = express.Router();
const passport = require('passport');

const Session = require('../controllers/SessionController');

router.get('/verifySession', passport.authenticate('jwt', {session: false}), (req, res) => {

    Session.verifySession(req, res);

});

module.exports = router;