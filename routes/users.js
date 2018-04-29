var express = require('express');
var router = express.Router();
const expressValidator = require('express-validator');

router.use(expressValidator());

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('login');
});
router.post('/login', function(req, res, next) {
  res.render('login');
});
router.get('/register', function(req, res, next){
  res.render('register');
})
router.post('/register', function(req, res, next){

  req.check('fname', 'Enter your first name').notEmpty();
  req.check('fname', 'Your first name cannot contain numbers or symbols').isAlpha();
  req.check('lname', 'Enter your last name').notEmpty();
  req.check('fname', 'Your last name cannot contain numbers or symbols').isAlpha();
  req.check('username', 'Enter a username').notEmpty();
  req.check('username', 'Username can contain numbers and lowercase letters only').isAlphanumeric().isLowercase();
  req.check('password', 'Enter a password').notEmpty();
  req.check('password', 'Passwords don\'t match').equals(req.body.confirmpass);
  req.check('password', 'Passwords must be atleast 4 characters long').isLength({min:4});
  req.check('confirmpass', 'Re-enter the password').notEmpty();

  var errors = req.validationErrors();
  if (errors){
    req.flash('val_errors', errors);
    res.redirect('/user/register');
  }
  else{
    req.flash('register_status', true);
    res.redirect('/user/login');
  }
})

module.exports = router;
