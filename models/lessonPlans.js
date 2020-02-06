var express = require('express');
var mongoose = require('mongoose');
var db = require('../config/db');

var lessonPlanSchema = mongoose.Schema({
    year: Number,
    season: Number,
    month: Number,
    day: Number,
    teacher : String,
    lessonName : String,
    keyToDownload : String
});

var LessonPlan = mongoose.model("LessonPlan", lessonPlanSchema);

exports.LessonPlan = LessonPlan;
