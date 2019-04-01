const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectID;

const login_schema = new Schema({
    CNP:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    timestamp:{
        type: Date,
        default: Date.now()
    },
    user_agent:{
        type: String,
        required: true
    },
    IP:{
        type: String,
        required: true
    }
});

module.exports = Login = mongoose.model("login", login_schema);
