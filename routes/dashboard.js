var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    if (req.session.username)
    res.render('dashboard');
    else{
        req.flash('login_status', 'Please sign in to use the dashboard');
        res.redirect('/user/login');
    }
});

module.exports = router;