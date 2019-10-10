var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose = require('mongoose');
var upload = multer();
var router = express.Router();
var path = require('path');
var userModel = require('../models/users');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
router.use(upload.array());
router.use(express.static('public'));

router.post('/', function (req, res) {
    var UserInfo = req.body; //Get the parsed information
    if (!UserInfo.firstname || !UserInfo.lastname || !UserInfo.email || !UserInfo.job ||
        !UserInfo.password) {
        console.log("wtf hppened");
    } else {
        if (UserInfo.isPrior == undefined) {
            var newUser = new userModel.User({
                firstname: UserInfo.firstname,
                lastname: UserInfo.lastname,
                job: UserInfo.job,
                email: UserInfo.email,
                password: UserInfo.password,
                isPrior: false,
                isAdmin: false
            });
        }
        if (UserInfo.isPrior == "on") {
            var newUser = new userModel.User({
                firstname: UserInfo.firstname,
                lastname: UserInfo.lastname,
                job: UserInfo.job,
                email: UserInfo.email,
                password: UserInfo.password,
                isPrior: true,
                isAdmin: false
            });
        }

        newUser.save(function (err, Teacher) {
            if (err)
                console.log("eeeeerrrrrrrrrrorrr")
            else
                console.log("heyyyyyyy")
        });
    }
});

module.exports = router;