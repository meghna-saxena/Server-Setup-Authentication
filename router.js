const Authentication = require('./controllers/authentication');
const passortService = require('./services/passport');
const passport = require('passport');

//Create an object that will be inserted as middleware
//between incoming request nad route handler
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

//Access app in the function
module.exports = function(app) {
    app.get('/', requireAuth, function(req, res) {
        res.send({ message: 'Super secret code is ABC123' });
    });
    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup);
}