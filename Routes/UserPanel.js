var express = require('express');
var router = express.Router();
var path = require('path');
var date = require('jalaali-js');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var convertor = require('persianjs');
var reportsModel = require('../models/reports');
var usersModel = require('../models/users');
var mongoose = require('mongoose');

var d = new Date();
var myDate = date.toJalaali(d.getFullYear(), d.getMonth()+1 , d.getDate());
console.log(convertor(date.toJalaali(d.getFullYear(),d.getMonth()+1 , d.getDate()).jy).englishNumber().toString());
var months = ["فروردین", "اردیبهشت","خرداد","تیر","مرداد","شهریور","مهر","آبان","آذر","دی","بهمن","اسفند"];
var weekdays = ["شنبه","یکشنبه","دوشنبه","سه شنبه","چهارشنبه","پنجشنبه","جمعه"];
var currentSeasonNumber , userNames , totalSessions;
var review = {
    sharh : "",
    barname : "" ,
    lavazem : "" ,
    tedad : "" ,
    hoze : "" ,
    tarikh : ""
};

router.use(cookieParser());
router.use(session({secret: "Shh, its a secret!"}));

var page = 0;
var todayDate = weekdays[d.getDay()+1] + "، " + myDate.jd + " " + months[myDate.jm] + " " +
    convertor(date.toJalaali(d.getFullYear(),d.getMonth()+1 , d.getDate()).jy).englishNumber().toString();


function checkSignIn(req, res , next){
    if(req.session.email){
        next();
    } else {
        var err = new Error("Not logged in!");
        next(err);
        console.log(2);
    }
}

router.get('/', checkSignIn ,function (req, res , next) {
    var resp = null;
    reportsModel.Report.find({user: req.session.email, year: myDate.jy}, function (err, response) {
        resp = response;
        var a;
        totalSessions = 0;
        for (a in response) {
            totalSessions += response[a].sessions;
        }
        usersModel.User.find(function (err, respon) {
            userNames = respon;
            res.render('userPanel.ejs', {
                response: resp, fullname: req.session.fullname, currentSeason: "", myDate: myDate
                , currentSeasonNumber: currentSeasonNumber, job: req.session.job, total: totalSessions, seasonTotal: 0
                , review: review, page: page, todayDate: todayDate , userNames : userNames
            });
        });
    });
});

router.use('/', function(err, req, res, next){
    res.redirect('/login');
});


router.get('/nextYear' , function(req, res) {
    myDate.jy += 1;
    res.redirect('/user')
});

router.get('/lastYear' , function(req, res) {
    myDate.jy -= 1;
    res.redirect('/user')
});

router.get('/spring' , function(req, res) {
    var resp = null;
    currentSeasonNumber = 1;
    page = 0;
    reportsModel.Report.find({user : req.session.email , year : myDate.jy } ,function(err, response){
        resp = response;
        res.render('userPanel.ejs' , { response : resp , fullname : req.session.fullname , currentSeason : "بهار", myDate: myDate
            , currentSeasonNumber : currentSeasonNumber , job : req.session.job , total : totalSessions , seasonTotal : 0
            , review : review , page : page , todayDate : todayDate , userNames : userNames});
    });
});

router.get('/summer' , function(req, res) {
    var resp = null;
    currentSeasonNumber = 2;
    page = 0;
    reportsModel.Report.find({user : req.session.email , year : myDate.jy } ,function(err, response){
        resp = response;
        res.render('userPanel.ejs' , { response : resp , fullname : req.session.fullname , currentSeason : "تابستان", myDate: myDate
            , currentSeasonNumber : currentSeasonNumber ,job : req.session.job , total : totalSessions , seasonTotal : 0
            , review : review , page : page , todayDate : todayDate , userNames : userNames});
    });
});

router.get('/fall' , function(req, res) {
    var resp = null;
    currentSeasonNumber = 3;
    page = 0;
    reportsModel.Report.find({user : req.session.email , year : myDate.jy } ,function(err, response){
        resp = response;
        res.render('userPanel.ejs' , { response : resp , fullname : req.session.fullname , currentSeason : "پاییز", myDate: myDate
            , currentSeasonNumber : currentSeasonNumber ,job : req.session.job , total : totalSessions , seasonTotal : 0
            , review : review , page : page , todayDate : todayDate , userNames : userNames});
    });
});

router.get('/winter' , function(req, res) {
    var resp = null;
    currentSeasonNumber = 4;
    page = 0;
    reportsModel.Report.find({user : req.session.email , year : myDate.jy } ,function(err, response){
        resp = response;
        res.render('userPanel.ejs' , { response : resp , fullname : req.session.fullname, currentSeason : "زمستان", myDate: myDate
            , currentSeasonNumber : currentSeasonNumber ,job : req.session.job , total : totalSessions , seasonTotal : 0
            , review : review , page : page , todayDate : todayDate , userNames : userNames});
    });
});

router.get('/:id' , function(req, res) {
    var resp = null;
    reportsModel.Report.findById( req.params.id ,function(err, response){
        review.sharh = response.description;
        review.barname = response.plan;
        review.lavazem = response.tools;
        review.tedad = response.sessions;
        review.hoze = response.area;
        review.tarikh = response.year + "/" + response.month + "/" + response.day;
        console.log(review);
        page = 5;
        res.redirect('/user');
    });
});

module.exports = router;