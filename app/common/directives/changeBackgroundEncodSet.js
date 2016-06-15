/**
 * Created by userName on 2015/12/5.
 */
var changeBackgroundEncodSet= function (JSCommand,Constants,$timeout) {
    return{
        restrict:'EA',
        scope:false,
        link:link
    };
    function link(scope, element){
        scope.changeBackgroundEncodSet = function () {
            element.css('background', '#CED3D9');
        };
        //设码配置
        scope.goToEncodingSettings = function () {
            console.log('goToEncodingSettings');
            element.css('background', 'linear-gradient(to bottom, #FFFFFF 0%,#F5F7FA 100%)');
            $timeout(function () {
                JSCommand.app.switchPages(Constants.what_pages.encodingSettings);
            }, 300)
        };

    }
};
changeBackgroundEncodSet.$inject=[
    'JSCommand',
    'Constants',
    '$timeout'
];
module.exports=changeBackgroundEncodSet;