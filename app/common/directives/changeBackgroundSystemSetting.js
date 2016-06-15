/**
 * Created by userName on 2015/12/5.
 */
var changeBackgroundSystemSetting= function (JSCommand,Constants,$timeout) {
    return{
        restrict:'EA',
        scope:false,
        link:link
    };
    function link(scope, element){
        scope.changeBackgroundSystemSetting = function () {
            element.css('background', '#CED3D9');
        };
        //设置
        scope.goToSystemSetting = function () {
            console.log('changeBackgroundSystemSetting');
            element.css('background', 'linear-gradient(to bottom, #FFFFFF 0%,#F5F7FA 100%)');
            $timeout(function () {
                JSCommand.app.switchPages(Constants.what_pages.SystemSetting);
            }, 300)
        };

    }
};
changeBackgroundSystemSetting.$inject=[
    'JSCommand',
    'Constants',
    '$timeout'
];
module.exports=changeBackgroundSystemSetting;