const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

    res.render('index');

});

router.get('/register', (req, res) => {

    res.render('register');

});

router.get('/home', (req, res) => {

  res.render('home');

});

router.get('/store', (req, res) => {

  res.render('store');

});

router.get('/show', (req, res) => {

  res.render('show');

});

router.get('/update', (req, res) => {

  res.render('update');

});

router.get('/delete', (req, res) => {

  res.render('delete');

});

module.exports = router;