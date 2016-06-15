/**
 * Created by userName on 2015/12/4.
 */

var _ = require('underscore');

var homePage = function () {
    return {
        restrict: 'EA',
        scope: false,
        link: link
    };
    function link(scope,element){
        var docEl = document.documentElement;
        var clientWidth = docEl.clientWidth;
        docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
        console.log("html",docEl.style.fontSize);

    }
};


    homePage.$inject = [

    ];

    module.exports = homePage;