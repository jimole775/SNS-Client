/**
 * Created by Weidongjian on 2015/12/9.
 */
var hoursDirective = function (){
    return {
        restrict: 'EA',

        template: '<span ng-repeat="hour in hourArr" ng-class={"quesolg":hour.hourClass}>{{hour.hour}}</span>',

        replace: true,

        link: function (scope, element, attrs, model) {
            var loopHourArr = [{
                begin: 00,
                end: 24
            }];
            scope.hourArr = [];
            var j;
            //var hourFlag = (Number(sessionStorage.getItem('timeFlag')) === 0) ? (sessionStorage.getItem('hourFlag1')) : (sessionStorage.getItem('hourFlag2'));

            for (var i = loopHourArr[0].begin; i < loopHourArr[0].end; i++) {
                if (i === 0) {
                    j = "0" + i;
                    scope.hourArr.push({hour: j, hourClass: true})
                } else if (i < 10) {
                    j = "0" + i;
                    //if (Number(i) === Number(hourFlag)) {
                    //    scope.hourArr.push({hour: j, hourClass: true})
                    //}
                    //else {
                    scope.hourArr.push({hour: j, hourClass: false});
                    //}
                }
                else {
                    //if (Number(i) === Number(hourFlag)) {
                    //    scope.hourArr.push({hour: i, hourClass: true})
                    //}
                    //else {
                    scope.hourArr.push({hour: i, hourClass: false});
                    //}
                }
            }
            if (!sessionStorage.getItem('timeFlag')) {
                sessionStorage.setItem('timeFlag', 0);
            }
            if (Number(sessionStorage.getItem('timeFlag')) === 0) {
                sessionStorage.setItem('hourFlag1', '00');
            }
            if (Number(sessionStorage.getItem('timeFlag')) === 1) {
                sessionStorage.setItem('hourFlag2', '00');
            }
            //element[0].parentElement.style.transform = "translate3d(0px," + -Number(hourFlag) * 50 + "px,0px) scale(1)";
            //console.log(element[0].parentElement);
        }
    }
};

hoursDirective.$inject =[

];

module.exports =hoursDirective;