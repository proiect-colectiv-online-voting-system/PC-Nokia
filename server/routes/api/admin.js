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
                        console.log(err);
                    });
                } else{
                    res.status(400);
                    res.json({err_msg: "Error on requesting information from https://ipinfo.io/json:" + error})
                }
            });
            res.status(201);
            res.redirect('/api/admin/list-polls');
        } else {
            res.status(400);
            res.json({err_msg: "CNP is not registered as an admin"});
        }
    } else {
        res.status(400);
        res.json({err_msg: "Not a valid CNP"});
    }
});

router.get('/list-logins', function(req, res, next){
    var polls = Login.find(function (err, logins){
        res.status(200);
        res.json(logins);
    });
});

router.get('/find-logins', function(req, res, next){
    var polls = Login.find({ [req.query.field]: { "$regex": req.query.term, "$options": "i" } }, function (err, logins){
        res.status(200);
        res.json(logins);
    });
});

router.get('/list-polls', function(req, res, next){
    var polls = Poll.find(function (err, polls){
        res.status(200);
        res.json(polls);
    });
});

// Creates a new poll, returns the created poll
router.post('/poll-create', function(req, res, next){
    var newPoll = new Poll();
    newPoll.title = req.body.title;
    newPoll.question = req.body.question;
    newPoll.creation_time = Date.now();
    newPoll.start_time = req.body.start_time;
    newPoll.end_time = req.body.end_time;
    newPoll.options = [];

    for(var i=1;i<=req.body.optionsCounted;i++){
        newPoll.options.push({option: req.body['option' + i], icon: req.body['icon' + i]});
        // console.log(req.body['option' + i]);
    }
    newPoll.save().catch(function(err){
        console.log(err)}
    );
    res.redirect('/admin/poll-create');
});


// TODO: handle suspicios logins

module.exports = router;
