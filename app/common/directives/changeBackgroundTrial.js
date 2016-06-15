/**
 * Created by userName on 2015/12/5.
 */
var changeBackgroundTrial= function (JSCommand,Constants,$timeout) {
    return{
        restrict:'EA',
        scope:false,
        link:link
    };
    function link(scope, element){
        scope.changeBackgroundTrial = function () {
            element.css('background', '#CED3D9');
        };
        //ƒ£ƒ‚ ‘”√
        scope.goToSimulationTrial = function () {
            console.log('goToEncodingSettings');
            element.css('background', 'linear-gradient(to bottom, #FFFFFF 0%,#F5F7FA 100%)');
            $timeout(function () {
                JSCommand.app.switchPages(Constants.what_pages.simulationTrial);
            }, 300)
        };

    }
};
changeBackgroundTrial.$inject=[
    'JSCommand',
    'Constants',
    '$timeout'
];
module.exports=changeBackgroundTrial;