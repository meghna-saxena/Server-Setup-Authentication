const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy =  require('passport-local');

//Setup options for local strategy
const localOptions = {usernameField: 'email'};

//Create local strategy
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
    //Verify the username(email) and password, call 'done' if its correct, 
    //else call 'done' with false
    User.findOne({email: email}, function(err, user) {
        if(err) {return done(err); }
        if (!user) {return done(null, false); }

        //Compare passwords
        //Is `password` = user.password?
        user.comparePassword(password, function(err, isMatch) {
            if (err) { return done(err); }
            if (!isMatch) { return done(null, false); }
      
            return done(null, user);
        });
    });
});

//Setup options for jwt strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
} ;

//Create jwt strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    //See if user ID in payload exists in database
    //If it does, call 'done' with that user,
    //otherwise, call 'done' without user object
    //Note: user ID is encoded as sub property on the token

    User.findById(payload.sub, function(err, user) {
        if (err) { return done(err, false); }
    
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
    });
});

//Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);