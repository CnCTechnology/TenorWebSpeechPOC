
var apiai = require('apiai');
var apiApp = apiai("0d6036e2370c4cb59ba989763c69d1aa");////00e250db9e5a4c87b9fd703fb3dbbf98

var getSessionId = function () {
    // var yourDate = new Date();
    // var epochTicks = 621355968000000000;
    // var ticksPerMillisecond = 10000;
    // var yourTicks = epochTicks + (yourDate.getTime() * ticksPerMillisecond);
    // return yourTicks;
    return "0d6036e2370c4cb59ba989763c69d1aa";
}


var apiaiRequest = {
    process: function (req, cb_result, cb_error) {
        var request = apiApp.textRequest(req.body.textMessage, {
            sessionId: getSessionId()
        });

        request.on('response', function (response) {
            return cb_result(response.result);
        });

        request.on('error', function (error) {
            return cb_error(error);
        });
        request.end();
    }
};
module.exports = apiaiRequest; 
