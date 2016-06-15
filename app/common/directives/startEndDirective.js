/**
 * Created by vip on 2015/12/10.
 */
var startEndDirective = function () {

    return {
        restrict: 'EA',
        link: function (scope, element, attrs, model) {
            scope.currentTimeTab = "currentTimeTab1";
            scope.selectTimeTab = function (timeTab) {
                scope.currentTimeTab = timeTab;
                if (timeTab == 'currentTimeTab1') {
                    sessionStorage.setItem('timeFlag', 0);
                }
                else {
                    sessionStorage.setItem('timeFlag', 1);
                }
            }
        }
    }

};

startEndDirective.$inject = [

];

module.exports = startEndDirective;