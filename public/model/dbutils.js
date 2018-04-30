const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mailingapp');

const Schema = mongoose.Schema;
// User schema
const userSchema= new Schema({
    first_name: String,
    last_name: String,
    username: String,
    password: String
});
// User Model
const User = mongoose.model('user', userSchema);

function saveUser(user){
    var newUser = new User(user);
    newUser.save();
}

function findUser(username, callback){
    User.findOne({username: username}, function(err, user){
        if (err) throw err;
        else callback(user);
    })        
}

function validateUser(username, password, callback){
    User.findOne({username: username, password:password}, function(err, user){
        if (err) throw err;
        else callback(user);
    })
}

// Email Schema 
const emailSchema = new Schema({
    to: String,
    from: String,
    subject: String,
    body: String,
    date: String
});
// Email Model
const Email = mongoose.model('email', emailSchema);

function sendEmail(email){
    var newEmail = new Email(email);
    newEmail.save();
}

function getEmails(to, callback){
    Email.find({to: to}, function(err, emails){
        if (err) throw err;            
        else callback(emails);
        
    });
}

// User reg and login functions
module.exports.saveUser = saveUser;
module.exports.findUser = findUser;
module.exports.validateUser = validateUser;

// EMail sending and receiving functions
module.exports.sendEmail = sendEmail;
module.exports.getEmails = getEmails;