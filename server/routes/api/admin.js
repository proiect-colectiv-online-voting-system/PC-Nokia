var express = require('express');
var request = require('request');

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

// TODO: implement additional features for checking CNP
var isCNPvalid = function(CNP){
    CNP_mask = "279146358279";
    if(CNP.length != 13){        
        return false;
    }
    else{
        var sum = 0;
        for(var i = 0; i < CNP.length - 1; i++){
            sum += (parseInt(CNP.charAt(i)) * parseInt(CNP_mask.charAt(i)));
        }
        var control_digit = sum%11 != 0 ? sum%11 : 1;
        if(control_digit != CNP.charAt(12))
            return false;
    }
    return true; 
}

router.post('/', function(req, res, next){
    if(isCNPvalid(req.query.CNP)){    
        if(isAdmin){
            var user_agent = req.headers['user-agent'];
            
            request('https://ipinfo.io/json', function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var ip_data = JSON.parse(body);

                    var newLogin = new Login({
                        CNP: req.query.CNP,
                        location: ip_data.city + ', ' + ip_data.region + ', ' + ip_data.country,
                        timestamp: Date.now(), // TODO: sync with RO timezone
                        user_agent: user_agent,
                        IP: ip_data.ip
                    });
                    
                    newLogin.save().catch(function(err){
                        console.log(err)}
                    );
                } else{
                    res.json({err_msg: "Error on requesting information from https://ipinfo.io/json:" + error})
                }
            });
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

// TODO: handle suspicios logins

module.exports = router;
