var express = require('express');
var request = require('request');

var router = express.Router();

router.get('/', function (req, res ,next){
    res.status(200);
    res.sendFile('index.html', {root: __dirname});
});

router.get('/login-list', function (req, res ,next){
    res.status(200);
    res.sendFile('login-list.html', {root: __dirname});
});

router.get('/login-find', function (req, res ,next){
    res.status(200);
    res.sendFile('login-find.html', {root: __dirname});
});

router.get('/poll-create', function (req, res ,next){
    res.status(200);
    res.sendFile('poll-create.html', {root: __dirname});
});

router.get('/poll-list', function (req, res ,next){
    res.status(200);
    res.sendFile('poll-list.html', {root: __dirname});
});

module.exports = router;