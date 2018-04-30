var express = require('express');
var router = express.Router();
var db = require('../public/model/dbutils.js');

router.get('/', function(req, res, next){
    if (req.session.username){
        res.render('mail');
    }
    else{
        req.flash('login_status', "Please login to access the site.")
        res.redirect('/user/login');
    }
});

router.get('/compose', function(req, res, next){
    if (req.session.username){
        res.render('compose');
    }
    else{
        req.flash('login_status', "Please login to access the site.")
        res.redirect('/user/login');
    }  
});

router.post('/compose', function(req, res, next){
   let email = req.body;
   email.from = req.session.username;
   email.date = new Date().toDateString();
   db.sendEmail(email);
   res.redirect('/mail');
});


router.get('/inbox', function(req,res,next){
    let user = req.session.username;
    let emailsProcessed = 0;
    db.getEmails(user, function(emails){

        if (emails.length !=0){
        emails.forEach(function(email){
            db.findUser(email.from, function(user){
                let fullname = user.first_name+" "+user.last_name;
                console.log(fullname);
                email.sender = fullname;
                emailsProcessed++;
                if(emailsProcessed === emails.length){
                    res.render('inbox', {
                        emails: emails
                    });
                }
            });
        })}
        else{
            res.render('inbox');
        } 

    })
});

module.exports = router;