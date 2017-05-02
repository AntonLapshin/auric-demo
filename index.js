var Express = require('express');
var path = require('path');
var auric = require('./server/auric');

var app = Express();

/**
 * Get Session Id. Auric API.
 * 
 */
app.get('/get_session', function (req, res) {
  auric.getSession(function(sessionId){
    res.json(sessionId);
  })
})

app.use(Express.static(path.join(__dirname, 'public')));
var port = process.env.PORT || 8080;
app.set('port', port);
app.listen(port, function () {
  console.log("app.listen on " + port);
});