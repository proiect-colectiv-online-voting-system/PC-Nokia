const { isCNPvalid } = require("../../utils/cnp_check");

var express = require('express');
var request = require('request');

var router = express.Router();

// models
const Login = require('../../models/login');
const Poll = require('../../models/polls');

router.post('/', function(req, res, next){
    console.log(JSON.stringify(req.body));
    if(isCNPvalid(req.body.CNP)){    
        var user_agent = req.headers['user-agent'];
        
        request('https://ipinfo.io/json', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var ip_data = JSON.parse(body);
                console.log(body);

                var newLogin = new Login({
                    CNP: req.body.CNP,
                    location: ip_data.city + ', ' + ip_data.region + ', ' + ip_data.country,
                    timestamp: Date.now(), // TODO: sync with RO timezone
                    user_agent: user_agent,
                    IP: ip_data.ip
                });

                console.log("New login:\n" + JSON.stringify(newLogin));
                
                newLogin.save().catch(function(err){
                    console.log(err)}
                );
            } else{
                res.json({err_msg: "Error on requesting information from https://ipinfo.io/json:" + error})
            }
        });
        res.redirect('/api/list-polls');
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
