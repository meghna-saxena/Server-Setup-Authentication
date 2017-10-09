const Authentication = require('./controllers/authentication');
const passortService = require('./services/passport');
const passport = require('passport');

//Create an object that will be inserted as middleware
//between incoming request nad route handler
const requireAuth = passport.authenticate('jwt', {session: false});

//Access app in the function
module.exports = function(app) {
    //define a route that user can visit
    app.get('/', requireAuth, function(req, res) {
        res.send({hi: 'there'});
    });
    
    app.post('/signup', Authentication.signup);
}
