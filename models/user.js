const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

//Define model
const userSchema = new Schema ({
    email: {type: String, unique: true},
    password: String
});

//On Save Hook, encrypt Password
//Before saving a model, run this function
userSchema.pre('save', function(next) {
    //get access to user model, 
    //here user is instance of user model
    const user = this;

    //Generate a salt, and then run a callback
    bcrypt.genSalt(10, function(err, salt) {
        if(err) {return next(err); }

        //hash(encrypt) the password using salt
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if(err) {return next(err); }

            //Overwrite plain text password with encrypted password
            user.password = hash;
            //save the model
            next();
        });
    });
});

//Create model class
const ModelClass = mongoose.model('user', userSchema);

//Export the model
module.exports = ModelClass;