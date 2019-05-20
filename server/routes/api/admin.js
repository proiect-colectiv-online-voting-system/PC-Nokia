var express = require('express');
var request = require('request');

var router = express.Router();

// models
const Login = require('../../models/login');
const Poll = require('../../models/polls');
const Admin_Token = require('../../models/admin_token');

var isAdmin = function(adminToken){
    var found = false;
    Admin_Token.find({} , (err, tokensDoc) => {
        tokensDoc.map(tokenArray => {
            tokenArray.tokens.forEach(token => {
                if(token == adminToken){
                    found = true;
                }
            });
        })
    })
    return found;
}

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

router.get('/find-poll', function(req, res, next){
    var poll = Poll.findOne( {title: req.query.title, question: req.query.question }, function (err, poll){
        res.status(200);
        res.json(poll);
    });
});

router.get('/authenticate', function(req, res, next){
    if(!isAdmin(req.query.adminToken)){
        var user_agent = req.headers['user-agent'];
        
        request('https://ipinfo.io/json', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var ip_data = JSON.parse(body);

                var newLogin = new Login({
                    CNP: 0,
                    location: ip_data.city + ', ' + ip_data.region + ', ' + ip_data.country,
                    timestamp: Date.now(),
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
        res.json({status: 0});
    } else {
        res.status(400);
        res.json({err_msg: "Wrong admin token", status: 1});
    }
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

    newPoll.options.push({ option: Number.MAX_SAFE_INTEGER, icon: null});

    for(var i=1;i<=req.body.optionsCounted;i++){
        newPoll.options.push({option: req.body['option' + i], icon: req.body['icon' + i]});
    }
    newPoll.save().catch(function(err){
        console.log(err)}
    );
    res.redirect('/admin/poll-create');
});

module.exports = router;
