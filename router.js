const Authentication = require('./controllers/authentication');

//Access app in the function
module.exports = function(app) {
    //define a route that user can visit
    app.post('/signup', Authentication.signup);
}
