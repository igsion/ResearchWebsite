var express = require('express');
var mongoose = require('mongoose');
var db = require('../config/db');

var usersSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    job: String,
    school: String,
    password: String,
    totalSessions: Number,
    isPrior: Boolean,
    isAdmin : Boolean
});

var User = mongoose.model("User", usersSchema);

exports.User = User;