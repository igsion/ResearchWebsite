var express = require('express');
var mongoose = require('mongoose');
var db = require('../config/db');

var reportsSchema = mongoose.Schema({
    user : String,
    description: String,
    plan: String,
    tools: String,
    sessions: Number,
    area: String,
    year: Number,
    season: Number,
    month: Number,
    day: Number,
    condition: Number
});

var Report = mongoose.model("Report", reportsSchema);

exports.Report = Report;