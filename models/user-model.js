const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    username: String,
    password: String,
    googleId: String,
    githubId: String,
    stackexchangeId: String,
    redditId: String,
    scores: Array,
    timeOftest: Array,
    realWorldTime: Array,
    personalBest: Number,

});

const User = mongoose.model('user', userSchema);

module.exports = User;
