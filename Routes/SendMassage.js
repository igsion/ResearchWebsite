var express = require('express');
var session = require('express-session');
var mongoose = require('mongoose');
var multer = require('multer');
var upload = multer({ dest:'uploads/massages/'});
var router = express.Router();
var messageModel = require('../models/messages');

router.post('/' , upload.single("messageAttachment") , function (req, res) {
    var messageInfo = req.body;
    if(!messageInfo.theTarget || !messageInfo.mainContent || !messageInfo.messageAttachment ){
        res.render("Sorry, you provided worng info");
    }else{
        var newMessage = new messageModel.Message({
            sender: req.session.user,
            getter : messageInfo.theTarget,
            content : messageInfo.mainContent,
            sendingDate : Date()
        });

        newMessage.save(function(err, Message){
            if(err)
                console.log(err);
            else{
                console.log("successful")
            }
        });
    }
});

module.exports = router;