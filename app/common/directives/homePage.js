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
        var height= window.innerHeight -260+'px';
        element.css('height',height);
        var width=window.innerWidth;
        console.log("width:",width);
        console.log("height:",height);


        var docEl = document.documentElement;
        var clientWidth = docEl.clientWidth;
        docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
        console.log("html",docEl.style.fontSize);


       /* console.log('document',document);
        console.log('window',window);
            var docEl = document.documentElement,
                resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
                recalc = function () {
                    var clientWidth = docEl.clientWidth;
                    if (!clientWidth) return;
                    docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
                };
            console.log("html~~~~~~~~~~~",docEl);
            if (!document.addEventListener) return;
        window.addEventListener(resizeEvt, recalc, false);
        document.addEventListener('DOMContentLoaded', recalc, false);*/

    }
};


    homePage.$inject = [

    ];

    module.exports = homePage;