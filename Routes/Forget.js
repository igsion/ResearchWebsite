var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/' , function (req , res , next) {
    res.render('Login-Forget' , { title : '' });
});


module.exports = router;