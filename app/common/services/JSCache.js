/**
 * Created by Administrator on 2016/1/8.
 */

var lscache = require('lscache');
var JSCache = function () {

    return {
        put : function(key, value, time){
            lscache.set(key, value, time);
        },
        get : function(key){
            return lscache.get(key);
        },
        remove : function(key){
            lscache.remove(key);
        }
    }

};

JSCache.$inject = [

];

module.exports = JSCache;