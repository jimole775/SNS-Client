/**
 * Created by userName on 2015/12/5.
 */

var changeBackgroundProgramming = function (JSCommand,
                                            Constants,
                                            $timeout) {
    return {
        restrict: 'EA',
        scope: false,
        link: link
    };

    function link(scope, element, attrs) {
        scope.changeBackgroundProgramming = function () {
            element.css('background', '#CED3D9');
        };
        scope.goToModuleProgramming = function () {
            console.log('goToVehicleDiagnosis');
            element.css('background', 'linear-gradient(to bottom, #FFFFFF 0%,#F5F7FA 100%)');
            $timeout(function () {
                //根据产品要求将模块编程的链接和设码配置一样,所以交换了指令
                //CCDPBusinessModuleProgramming模块编程指令
                //var moduleProgramming = Constants.APP_CMD.request.CCDPBusinessModuleProgramming;
                JSCommand.app.switchPages(Constants.what_pages.moduleProgramming);
            }, 300)
        };
    }
};

changeBackgroundProgramming.$inject = [
    'JSCommand',
    'Constants',
    '$timeout'
];

module.exports = changeBackgroundProgramming;