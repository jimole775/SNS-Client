/**
 * Created by Weidongjian on 2015/12/9.
 */
var minutesDirective = function (){
    return{
        restrict: 'EA',

        template: '<span ng-repeat="minute in minuteArr" ng-class={"quesolg":minute.minuteClass}>{{minute.minute}}</span>',

        replace: true,

        link: function (scope, element, attrs, model) {
            var loopminuteArr = [{
                begin: 00,
                end: 60
            }];
            scope.minuteArr = [];
            var j;

            for (var i = loopminuteArr[0].begin; i < loopminuteArr[0].end; i++) {
                if (i === 0) {
                    j = "0" + i;
                    scope.minuteArr.push({minute: j, minuteClass: true});
                } else if (i < 10) {
                    j = "0" + i;
                    scope.minuteArr.push({minute: j, minuteClass: false});
                }
                else {
                    scope.minuteArr.push({minute: i, minuteClass: false});
                }
            }
            if (Number(sessionStorage.getItem('timeFlag')) === 0) {
                sessionStorage.setItem('minuteFlag1', '00');
            }
            if (Number(sessionStorage.getItem('timeFlag')) === 1) {
                sessionStorage.setItem('minuteFlag2', '00');
            }
        }
    }
};

minutesDirective.$inject =[

];

module.exports =minutesDirective;