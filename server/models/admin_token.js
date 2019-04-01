const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = Schema.ObjectID;

const admin_token_schema = new Schema({
    tokens: [{
        type: String
    }]
});

module.exports = Admin_token = mongoose.model("admin_token", admin_token_schema);