var express = require('express');
var router = express.Router();

// models
const Login = require('../../models/login');
const Poll = require('../../models/polls');
const Admin_Token = require('../../models/admin_token');

const adminToken = "ADMINTOKEN123";

var isAdmin = function(adminToken){
    var tokens = Admin_Token.find();
    var found = false;
    tokens.forEach(token => {
        if(token == adminToken){
            found = true;
        }
    });
    return found;
}

// TODO: implement checking for CNP
var isCNPvalid = function(CNP){
    return true; 
}

// TODO: handle suspicios logins
router.get('/', function(req, res, next){
    if(isCNPvalid){    
        if(isAdmin){
            // TODO: get login information
            res.redirect('/api/admin/list-polls');
        } else {
            res.json({err_msg: "CNP is not registered as an admin"});
        }
    } else {
        res.json({err_msg: "Not a valid CNP"});
    }
});

router.get('/list-polls', function(req, res, next){
    var polls = Poll.find(function (err, polls){
        res.json(polls);
    });
});

module.exports = router;
