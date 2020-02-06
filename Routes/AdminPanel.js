var express = require('express');
var router = express.Router();
var path = require('path');
var date = require('jalaali-js');
var convertor = require('persianjs');
var usersModel = require('../models/users');
var tarhModel = require('../models/lessonPlans');
var reportsModel = require('../models/reports');

var d = new Date();
var myDate = date.toJalaali(d.getFullYear(), d.getMonth() + 1, d.getDate());
var months = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];
var weekdays = ["شنبه", "یکشنبه", "دوشنبه", "سه شنبه", "چهارشنبه", "پنجشنبه", "جمعه"];
var todayDate = weekdays[d.getDay() + 1] + "، " + myDate.jd + " " + months[myDate.jm] + " " +
    convertor(date.toJalaali(d.getFullYear(), d.getMonth() + 1, d.getDate()).jy).englishNumber().toString();
var user;
var review = {
    sharh: "",
    barname: "",
    lavazem: "",
    tedad: "",
    hoze: "",
    tarikh: "",
    condition: 1
};
var id = "";

var currentSeasonNumber, totalSessions, page, resp = {};
var responseUsers, responseTarhs;

router.get('/', function (req, res, next) {
    usersModel.User.find(function (err, responseUser) {
        responseUsers = responseUser;
        tarhModel.LessonPlan.find(function (err, responseTarh) {
            responseTarhs = responseTarh;
            res.render('adminPanel.ejs', {
                title: 'Admin Panel', fullname: req.session.fullname, job: req.session.job,
                responseUsers: responseUsers, responseTarhs: responseTarhs, response: resp, todayDate: todayDate,
                currentSeason: "", myDate: myDate, currentSeasonNumber: currentSeasonNumber, total: totalSessions,
                seasonTotal: 0, review: review, page: page
            });
        });
    });
});

router.get('/download/:id', function (req, res, next) {
    res.render('adminPanel', {
        title: 'Admin Panel', fullname: req.session.fullname, job: req.session.job,
        responseUsers: responseUsers, responseTarhs: responseTarhs, todayDate: todayDate
    });
});

router.get('/tarheDars/:id', function (req, res, next) {
    res.download(path.join(__dirname, '../uploads/tarheDars', req.params.id));
});

router.get('/check/:user', function (req, res, next) {
    user = req.params.user;
    reportsModel.Report.find({user: req.params.user, year: myDate.jy}, function (err, response) {
        page = 4;
        resp = response;
        res.render('adminPanel.ejs', {
            title: 'Admin Panel', fullname: req.session.fullname, job: req.session.job,
            responseUsers: {}, responseTarhs: {}, response: resp, todayDate: todayDate,
            currentSeason: "", myDate: myDate, currentSeasonNumber: currentSeasonNumber, total: totalSessions,
            seasonTotal: 0, review: review, page: page
        });
    })
});

router.get('/nextYear', function (req, res, next) {
    myDate.jy += 1;
    console.log(user);
    console.log(myDate);
    reportsModel.Report.find({user: user, year: myDate.jy}, function (err, response) {
        resp = response;
        res.render('adminPanel.ejs', {
            title: 'Admin Panel', fullname: req.session.fullname, job: req.session.job,
            responseUsers: responseUsers, responseTarhs: responseTarhs, response: resp, todayDate: todayDate,
            currentSeason: "", myDate: myDate, currentSeasonNumber: currentSeasonNumber, total: totalSessions,
            seasonTotal: 0, review: review, page: page
        });
    });
});

router.get('/lastYear', function (req, res, next) {
    myDate.jy += -1;
    reportsModel.Report.find({user: user, year: myDate.jy}, function (err, response) {
        resp = response;
        res.render('adminPanel.ejs', {
            title: 'Admin Panel', fullname: req.session.fullname, job: req.session.job,
            responseUsers: responseUsers, responseTarhs: responseTarhs, response: resp, todayDate: todayDate,
            currentSeason: "", myDate: myDate, currentSeasonNumber: currentSeasonNumber, total: totalSessions,
            seasonTotal: 0, review: review, page: page
        });
    });
});
router.get('/spring', function (req, res, next) {
    currentSeasonNumber = 1;
    res.render('adminPanel.ejs', {
        title: 'Admin Panel', fullname: req.session.fullname, job: req.session.job,
        responseUsers: responseUsers, responseTarhs: responseTarhs, response: resp, todayDate: todayDate,
        currentSeason: "", myDate: myDate, currentSeasonNumber: currentSeasonNumber, total: totalSessions,
        seasonTotal: 0, review: review, page: page
    });

});
router.get('/summer', function (req, res, next) {
    currentSeasonNumber = 2;
    res.render('adminPanel', {
        title: 'Admin Panel', fullname: req.session.fullname, job: req.session.job,
        responseUsers: responseUsers, responseTarhs: responseTarhs, response: resp, todayDate: todayDate,
        currentSeason: "", myDate: myDate, currentSeasonNumber: currentSeasonNumber, total: totalSessions,
        seasonTotal: 0, review: review, page: page
    });
});
router.get('/fall', function (req, res, next) {
    currentSeasonNumber = 3;
    res.render('adminPanel', {
        title: 'Admin Panel', fullname: req.session.fullname, job: req.session.job,
        responseUsers: responseUsers, responseTarhs: responseTarhs, response: resp, todayDate: todayDate,
        currentSeason: "", myDate: myDate, currentSeasonNumber: currentSeasonNumber, total: totalSessions,
        seasonTotal: 0, review: review, page: page
    });
});
router.get('/winter', function (req, res, next) {
    currentSeasonNumber = 4;
    res.render('adminPanel', {
        title: 'Admin Panel', fullname: req.session.fullname, job: req.session.job,
        responseUsers: responseUsers, responseTarhs: responseTarhs, response: resp, todayDate: todayDate,
        currentSeason: "", myDate: myDate, currentSeasonNumber: currentSeasonNumber, total: totalSessions,
        seasonTotal: 0, review: review, page: page
    });
});

router.get('/review/:id', function (req, res, next) {
    reportsModel.Report.findById(req.params.id, function (err, response) {
        id = req.params.id;
        review.sharh = response.description;
        review.barname = response.plan;
        review.lavazem = response.tools;
        review.tedad = response.sessions;
        review.hoze = response.area;
        review.tarikh = response.year + "/" + response.month + "/" + response.day;
        review.condition = response.condition;
        console.log(review);
        page = 5;
        res.render('adminPanel', {
            title: 'Admin Panel', fullname: req.session.fullname, job: req.session.job,
            responseUsers: responseUsers, responseTarhs: responseTarhs, response: resp, todayDate: todayDate,
            currentSeason: "", myDate: myDate, currentSeasonNumber: currentSeasonNumber, total: totalSessions,
            seasonTotal: 0, review: review, page: page
        });
    });
});

router.get('/review/admin/accept', function (req, res, next) {
    reportsModel.Report.findByIdAndUpdate(id , {condition : 3} ,function (err, response) {
        review.condition = 3;
        page = 5;
        res.render('adminPanel', {
            title: 'Admin Panel', fullname: req.session.fullname, job: req.session.job,
            responseUsers: responseUsers, responseTarhs: responseTarhs, response: resp, todayDate: todayDate,
            currentSeason: "", myDate: myDate, currentSeasonNumber: currentSeasonNumber, total: totalSessions,
            seasonTotal: 0, review: review, page: page
        });
    });
});

router.get('/review/admin/reject', function (req, res, next) {
    reportsModel.Report.findByIdAndUpdate(id,{condition : 2} , function (err, response) {
        review.condition = 2;
        page = 5;
        res.render('adminPanel', {
            title: 'Admin Panel', fullname: req.session.fullname, job: req.session.job,
            responseUsers: responseUsers, responseTarhs: responseTarhs, response: resp, todayDate: todayDate,
            currentSeason: "", myDate: myDate, currentSeasonNumber: currentSeasonNumber, total: totalSessions,
            seasonTotal: 0, review: review, page: page
        });
    });
});

module.exports = router;
