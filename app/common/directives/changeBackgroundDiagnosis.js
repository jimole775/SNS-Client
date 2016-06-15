/**
 * Created by userName on 2015/12/4.
 */

var _ = require('underscore');

var changeBackgroundDiagnosis = function ($timeout, Constants, JSCommand) {
    return {
        restrict: 'EA',
        scope: false,
        link: link
    };

    function link(scope, element, attrs) {

        //车辆诊断
        scope.changeBackgroundDiagnosis = function () {
            element.css('background', '#CED3D9');
        };
        scope.goToVehicleDiagnosis = function () {
            //console.log('vehicleDiagnosis');
            element.css('background', 'linear-gradient(to bottom, #FFFFFF 0%,#F5F7FA 100%)');
            $timeout(function () {
                JSCommand.app.switchPages(Constants.what_pages.vehicleDiagnosis);
            }, 300)
        };
    }
};

changeBackgroundDiagnosis.$inject = [
    '$timeout',
    'Constants',
    'JSCommand'
];

module.exports = changeBackgroundDiagnosis;