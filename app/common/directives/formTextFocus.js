/**
 * Created by vip on 2015/12/23.
 */
var _ = require('underscore');

var formTextFocus = function ($timeout) {
    return {
        restrict: "EA",

        link: function (scope, element, attrs, model) {
            element.find('i').eq(2).bind('click', function () {
                $timeout(function () {
                    element.find('input')[0].focus();
                }, 10);
            });
        }
    }
};

formTextFocus.$inject = [
    '$timeout'
];

module.exports = formTextFocus;