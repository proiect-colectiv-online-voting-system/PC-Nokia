var express = require('express');
var router = express.Router();

// models
const Login = require('../../models/login');
const Poll = require('../../models/polls');

const adminToken = "ADMINTOKEN123"


var isCNPvalid = function(CNP){
    return true; // TODO: implement checking for CNP
}

router.get('/', function(req, res, next){
    if(isCNPvalid){    
        var login = Login.where({CNP : req.query.CNP});
        login.findOne(function (err, login){
            if(err){
                res.json({err_msg: "Error while logging: " + err});
            } 
            else{
                if(login != null){ 
                    res.json(login);
                } else {
                    res.json({err_msg: "No such CNP recorded"});
                }
            }
        });
    } else {
        res.json({err_msg: "Not a valid CNP"});
    }
});

router.get('/list-polls', function(req, res, next){
    var polls = Poll.find(function (err, polls){
        res.json(polls);
    });
});

router.get('/')

module.exports = router