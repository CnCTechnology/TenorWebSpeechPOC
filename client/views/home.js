app.controller("HomeCtrl", ['$scope', '$rootScope', '$filter', function ($scope, $rootScope, $filter) {

    $scope.welcomeMessage = "Welcome to home controller";
    $scope.final_span = "";
    $scope.interim_span = "";

    var recognizing = false;


    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interim = true;
    recognition.lang = "en-GB";

    $scope.reset = function () {
        recognizing = false;
        $scope.final_span = "";
        $scope.button = "Click to Speak";
    }
    $scope.reset();
    recognition.onend = $scope.reset;

    recognition.onresult = function (event) {
        $scope.interim_span="";
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].final) {
                $scope.final_span += event.results[i][0].transcript;
            } else {
                $scope.interim_span += event.results[i][0].transcript;
                console.log("-------------- interim" + i + " ---------------------------")
                console.log($scope.interim_span);
            }
            // console.log($scope.final_span, $scope.interim_span);
        }

    }



    $scope.toggleStartStop = function () {
        if (recognizing) {
            recognition.stop();
            $scope.reset();
        } else {
            recognition.start();
            recognizing = true;
            $scope.button = "Click to Stop";
            $scope.final_span = "";
            $scope.interim_span = "";
        }
    }

}]);
