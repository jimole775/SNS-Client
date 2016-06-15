/**
 * Created by lianghaicheng on 2016/1/22.
 */

var _ = require('underscore');

var indexList = function () {
    return {
        restrict: 'EA',
        scope: false,
        link: link
    };
    function link(scope,element){
        var height= window.innerHeight+'px';
        element.css('height',height);
        var width=window.innerWidth;
        console.log("width:",width);
        console.log("height:",height);
    }
};


indexList.$inject = [

];

module.exports = indexList;