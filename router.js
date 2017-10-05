//Access app in the function
module.exports = function(app) {
    //define a route that user can visit
    app.get ('/', function (req, res, next) {
        //send a response of some JSON to incoming http request
        res.send (['waterbottle', 'phone', 'paper']);
    });
}