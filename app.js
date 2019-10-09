var express = require('express');
var multer = require('multer');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var upload = multer();
var app = express();
var usersModel = require('./models/users');

var login = require('./Routes/Login');
var userPanel = require('./Routes/UserPanel');
var addGozaresh = require('./Routes/AddGozaresh');
var addTarheDars = require('./Routes/AddTarheDars');
var forget = require('./Routes/Forget');
var admin = require('./Routes/AdminPanel');
var sendMassage = require('./Routes/SendMassage');
var addTeacher = require('./Routes/AddNewTeacher');

app.set('views','./views');
app.set('view engine' , 'ejs');

app.use(express.static('public'));
app.use(cookieParser());
app.use(session({secret: "this is secret"}));

app.use('/user' , userPanel);
app.use('/login' , login);
app.use('/forget' , forget);
app.use('/addGozaresh' , addGozaresh);
app.use('/addTarheDars' , addTarheDars);
app.use('/sendMassage' , sendMassage);
app.use('/addNewTeacher' , addTeacher);
app.use('/admin' , admin);

app.post('/Forget' , function (req , res) {
    console.log(req.body.username);
    res.send("recieved your request!");
});

module.exports = app;

app.listen(3000);