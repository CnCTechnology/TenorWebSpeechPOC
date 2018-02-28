var https = require('http');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var apiaiHelper = require('../speechRecognition/apiaiHelper');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json({
    parameterLimit: 100000,
    limit: '50mb',
    extended: true
}));
app.use(bodyParser.urlencoded({
    parameterLimit: 50000,
    limit: '50mb',
    extended: true
}));



app.all('/*', function (req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});


app.use('/', express.static(path.join(__dirname + '/client')));


app.get('/', function (req, res) {
    res.sendFile('index.html', { root: __dirname + "/client" });
});

app.post('/api/dialogflow', function (req, res) {    
    apiaiHelper.process(req,function(result){
        res.send(result.fulfillment.speech);
    },function(error){
        console.log(error);
        res.status(552).send(error);

    });
});


var port = process.env.PORT || 8080;
var server = https.createServer(app);

server.listen(port, function () {
    console.log('Template server has started on port: ' + server.address().port);
});