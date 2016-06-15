/**
 * Created by userName on 2015/12/8.
 */
var _ = require('underscore');

var chatMenu = function () {
    return {
        restrict: 'EA',
        scope: false,
        link: link
    };
    function link(scope,element){
        function elementNo(){
            for(var i=0;i<element.children().length;i++){
                element.children()[i].className='';
            }
        }
        element.children().on('click',function(){
            elementNo();
            this.className='on';
            setTimeout(function(){
                elementNo();
            },500);
        });

    }
};


chatMenu.$inject = [
];

module.exports = chatMenu;