var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var session = require('express-session');
var path = require('path');
var app = express();
var multer = require('multer');
var upload = multer();
var myApp = require('../app');
var bodyParser = require('body-parser');
var usersModel = require('../models/users');

router.use(cookieParser());
router.use(session({secret: "Shh, its a secret!"}));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(upload.array());
router.use(express.static('public'));

router.get('/' , function (req , res , next) {
    res.render('Login-Forget.ejs' , { title : 'dasd' , username : 'dadsa' ,  job : 'dasdad' , date : 'dad' , color : 0})
});

router.post('/', function (req, res , next ) {
    if (!req.body.username || !req.body.password) {
        res.redirect('/');
    } else {
        var username = req.body.username;
        var password = req.body.password;
        usersModel.User.findOne({email: username , password: password} , function (err , response) {
            if(err){
                res.redirect('login');
                console.log(4);
            }
            if(response == null){
                res.redirect('login');
            } else if(response.email == username && response.password == password) {
                req.session.email = response.email;
                req.session.fullname = response.firstname + " " + response.lastname;
                req.session.job = response.job;
                if (response.isAdmin) {
                    res.redirect('admin');
                }else{
                    res.redirect('user');
                }
            }
        });
    }
});

module.exports = router;
