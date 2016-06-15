/**
 * Created by userName on 2015/12/5.
 */
var changeBackgroundCodSet= function (JSCommand,Constants,$timeout) {
    return{
        restrict:'EA',
        scope:false,
        link:link
    };
    function link(scope, element){
        scope.changeBackgroundReset = function () {
            element.css('background', '#CED3D9');
        };
        //保养复位
        scope.goToMaintenanceReset = function () {
            console.log('goToEncodingSettings');
            element.css('background', 'linear-gradient(to bottom, #FFFFFF 0%,#F5F7FA 100%)');
            $timeout(function () {
                JSCommand.app.switchPages(Constants.what_pages.maintenanceReset);
            }, 300)
        };

    }
};
changeBackgroundCodSet.$inject=[
    'JSCommand',
    'Constants',
    '$timeout'
];
module.exports=changeBackgroundCodSet;