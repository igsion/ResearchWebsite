var express = require('express');
var mongoose = require('mongoose');
var db = require('../config/db');

var messagesSchema = mongoose.Schema({
    sender: String,
    getter : String,
    content : String,
    year: Number,
    season: Number,
    month: Number,
    day: Number
});

var Message = mongoose.model("Message", messagesSchema);

exports.Message = Message;