var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose = require('mongoose');
var upload = multer();
var router = express.Router();
var path = require('path');
var reportsModel = require('../models/reports');
var usersModel = require('../models/users');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(upload.array());
router.use(express.static('public'));

var sessions = 0;

router.post('/' , function (req, response , next) {
    var reportInfo = req.body;
    if(!reportInfo.descriptionInput || !reportInfo.planInput || !reportInfo.toolsInput || !reportInfo.numberInput
        || !reportInfo.areaInput){
        response.render("Sorry, you provided worng info");
    }else{
        var newReport = new reportsModel.Report({
            user: req.session.email,
            description: reportInfo.descriptionInput,
            plan: reportInfo.planInput,
            tools: reportInfo.toolsInput,
            sessions: reportInfo.numberInput,
            area: reportInfo.areaInput,
            year: reportInfo.dateYear,
            season: reportInfo.dateSeason,
            month: reportInfo.dateMonth,
            day: reportInfo.dateDay,
            condition: 1
        });

        newReport.save(function(err, Report){
            if(err)
                console.log(err);
            else{
                console.log("successful");
                var totalSessions = 0;
                reportsModel.Report.find({user : req.session.email} , function (err, res) {
                    var a;
                    for(a in res){
                        totalSessions += res[a].sessions;
                    }
                    usersModel.User.findOneAndUpdate({email : req.session.email} , {totalSessions : totalSessions}
                    ,function (err, resp) {
                        console.log(resp);
                        console.log(1);
                        response.redirect('/user');
                    });
                });
            }
        });
    }
});

module.exports = router;
