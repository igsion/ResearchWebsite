var express = require('express');
var session = require('express-session');
var router = express.Router();
var multer = require('multer');
var date = require('jalaali-js');
var path = require('path');
var mongoose = require('mongoose');
var lessonPlanModel = require('../models/lessonPlans');
var storage = multer.diskStorage({
    destination: function (req, file , cb) {
        cb(null, 'uploads/tarheDars/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
});
var upload = multer({ storage: storage });

var d = new Date();
var myDate = date.toJalaali(d.getFullYear() , d.getMonth()+1 , d.getDate());
var sea = (myDate.jm+3)/3;
var season = sea.toFixed();

router.post('/' , upload.single("lessonPlan") , function(req,res){
    var lessonPlanInfo = req.file;
    console.log(req.file);
    if(!lessonPlanInfo){
        res.render("Sorry, you provided worng info");
    }else{
        var newLessonPlan = new lessonPlanModel.LessonPlan({
            year: myDate.jy,
            season: season,
            month: myDate.jm,
            day: myDate.jd,
            teacher : req.session.fullname,
            lessonName : req.session.job,
            keyToDownload : req.file.filename
        });

        newLessonPlan.save(function(err, lessonPlan){
            if(err)
                console.log(err);
            else{
                console.log("successful")
            }
        });
    }
});

module.exports = router;