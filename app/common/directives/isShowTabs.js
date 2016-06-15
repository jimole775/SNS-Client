/**
 * Created by Weidongjian on 2015/12/7.
 */
var isShowTabs = function ($rootScope){
    return{
        restrict : 'A',
        scope : false,
        link : link
    };

    function link (scope,element,attrs){
        scope.isShowTabs = function (){
            $rootScope.showTabs = false;
        };

    }
};

isShowTabs.$inject = [
    '$rootScope'
];

module.exports = isShowTabs;