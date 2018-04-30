var express = require('express');
var router = express.Router();
const expressValidator = require('express-validator');
var db = require('../public/model/dbutils.js');

router.use(expressValidator());

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('login');
});
router.post('/login', function(req, res, next) {
  let username = req.body.username;
  let password = req.body.password;
  db.validateUser(username, password, (user)=>{
    if (user){
      req.session.username = user.username;
      res.render('dashboard');
    }
    else{
      req.flash('login_status', "Incorrect login details.");
      res.redirect('/user/login');
    }
  })
});
router.get('/register', function(req, res, next){
  res.render('register');
})
router.post('/register', function(req, res, next){

  req.check('fname', 'Enter your first name').notEmpty().trim();
  req.check('lname', 'Enter your last name').notEmpty().trim();
  req.check('username', 'Enter a username').notEmpty().trim();
  req.check('username', 'Username can contain numbers and letters only').isAlphanumeric().trim();
  req.check('password', 'Enter a password').notEmpty().trim();
  req.check('password', 'Passwords don\'t match').equals(req.body.confirmpass);
  req.check('password', 'Passwords must be atleast 4 characters long').isLength({min:4}).trim();
  req.check('confirmpass', 'Re-enter the password').notEmpty().trim();

  var errors = req.validationErrors();
  if (errors){
    req.flash('val_errors', errors);
    res.redirect('/user/register');
  }
  else{    
    db.findUser(req.body.username, (username)=>{
      if (!username){
        let user = {
          first_name: toTitleCase(req.body.fname),
          last_name: toTitleCase(req.body.lname),
          username: req.body.username,
          password: req.body.password
        };
        db.saveUser(user);
        req.flash('register_status', 'You have successfully registered. You may now login.');
        res.redirect('/user/login');
      }
      else{
        req.flash('val_errors', [{msg: 'Username already taken'}])
        res.redirect('/user/register');
      }
    });
  
}
})

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

module.exports = router;
