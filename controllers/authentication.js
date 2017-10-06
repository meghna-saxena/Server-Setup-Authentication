const User  = require('../models/user');

exports.signup = function(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    
    //See if a user with given email exists
    User.findOne({ email: email}, function(err, existingUser){

    });

    //If a user with email exists, return an error


    //If a user with email doesnt exist, create & save record

    
    //Respond to request indicating the user was created
}