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

router.get('/showStudent', (req, res) => {

  res.render('showStudent');

});

router.get('/update', (req, res) => {

  res.render('update');

});

router.get('/updateStudent', (req, res) => {

  res.render('updateStudent');

});

router.get('/delete', (req, res) => {

  res.render('delete');

});

router.get('/deleteStudent', (req, res) => {

  res.render('deleteStudent');

});

module.exports = router;