const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectID;

const poll_schema = new Schema({
    title: String,
    question: String,
    creation_time: Date,
    start_time: Date,
    end_time: Date,
    options: [ {
        option: String,
        icon: String,
        votes: [ {
            user_agent: String,
            IP: String,
            CNP: String, 
            location: String,
            timestamp: Date
        }]
    }]
});

module.exports = Poll = mongoose.model("poll", poll_schema);