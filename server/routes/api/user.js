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
        var ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress.split(',').trim();
        
        request(`https://ipinfo.io/${ip.substring(7)}/json`, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var ip_data = JSON.parse(body);
                console.log(body);

                var newLogin = new Login({
                    CNP: req.body.CNP,
                    location: ip_data.city + ', ' + ip_data.region + ', ' + ip_data.country,
                    timestamp: Date.now(), // TODO: sync with RO timezone
                    user_agent: user_agent,
                    IP: ip
                });

                console.log("New login:\n" + JSON.stringify(newLogin));
                
                newLogin.save().catch(function(err){
                    console.log(err)}
                );
            } else{
                res.json({err_msg: "Error on requesting information from https://ipinfo.io/json:" + error})
            }
        });
        res.json({status: "ok"});
    } else {
        res.json({status: "invalid-cnp", err_msg: "Not a valid CNP"});
    }
});

router.get('/list-polls', function(req, res, next){
    console.log("Hello");
    // var newPoll = new Poll();
    // newPoll.polls.push({});
    // newPoll.polls[0].option = "Vreț bany";
    // newPoll.polls[0].question = "Vreț nu?";
    // newPoll.polls[0].options = [{
    //     name: "Option 1",
    //     votes: []
    // }, {
    //     name: "Option 2",
    //     votes: []
    // }];

    // newPoll.save(function(err, poll){
    //     if(err) return console.error(err);
    //     console.log(poll);
    // });

    var polls = Poll.find(function (err, polls){
        res.json(polls);
    });
});

router.post('/vote', function(req, res, next){
    //POST {title: string, CNP: string, option: number, location: string, timestamp: time}
    var poll_title = req.body.title;
    var poll_choice = parseInt(req.body.option);

    console.log(req.body.cnp);

    var req_user_agent = req.headers['user-agent'];
    var req_ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress.split(',')[0].trim();

    Poll.findOne({title: poll_title}, function(err, poll){
        if(err) {
            console.log(err);
            return;
        }
        
        console.log("Poll:\n" + poll);

        poll_object = poll.toObject();

        // poll_object.polls[0].options[poll_choice].votes.push({
        //     CNP: req.body.cnp,
        //     user_agent: req_user_agent,
        //     IP: req_ip });
        
        //var new_votes = poll_object.polls[0].options[poll_choice].votes;
        //console.log("New votes:\n" + new_votes);
        
        Poll.update(  
            {'title': poll_title},
            //{'polls.0.options.$[opt].votes': new_votes},
            {$push: {'options.$[pot].votes': {
                CNP: req.body.cnp,
                user_agent: req_user_agent,
                IP: req_ip }}},
            {arrayFilters: [ {opt: {$eq: poll_choice}}]},
            function(err, raw) {
                if(err) {
                    console.log(err);
                    res.send({"status": "update-error", "message": err});
                }
                poll.save();
                console.log(raw);
                res.send({"status": "vote-registered", "message": "Vote registered successfully!"});
            });
    });

});

router.post('/view', function(req, res, next){
    //POST {title: string, CNP: string, option: number, location: string, timestamp: time}
    var poll_title = req.body.title;
    var poll_choice = req.body.number;

    console.log(req.body.cnp);

    var req_user_agent = req.headers['user-agent'] || "UNKNOWN-USER-AGENT";
    var req_ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress.split(',')[0].trim();

    Poll.findOne({'polls.title': poll_title}, function(err, poll){
        if(err) {
            console.log(err);
            res.send({
                "status": "poll-not-found",
                "message": err
            });
            return;
        }

        console.log(poll);
        
        res.send({
            "status": "poll-found",
            "poll": poll
        });
    });
});

// TODO: handle suspicios logins

module.exports = router;
