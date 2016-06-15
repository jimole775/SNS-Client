/**
 * Created by tapes on 2015/7/17.
 */

var _ = require('underscore');

var JSUtils = function ($rootScope,
                            Constants) {

    /*window.reloadWebView = function () {
        window.yhJsCallApp.process(0xA001, '', 0);
    };*/

    var slice = Array.prototype.slice;

    return {

        validString : function(string){
              if(string != null && string != undefined && string != ''){
                  return true;
              }

            return false;
        },

        getDateTime: function (timeStamp) {
            var now = new Date();
            var time = new Date(timeStamp);
            var now0 = new Date();
            now0.setHours(0);
            now0.setMinutes(0);
            now0.setSeconds(0);
            var value;
            if (now.getDate() === time.getDate()) {
                value = (time.getHours() < 10 ? ('0' + time.getHours()) : time.getHours()) + ':' + (time.getMinutes() < 10 ? ('0' + time.getMinutes()) : time.getMinutes());
            }
            else if ((parseInt(Math.abs(now0.getTime() - time.getTime()) / (1000 * 60 * 60 * 24)) === 0) || ((parseInt(Math.abs(now0.getTime() - time.getTime()) / (1000 * 60 * 60 * 24)) === 1) && (parseInt(Math.abs(now.getTime() - time.getTime()) / (1000 * 60 * 60 * 24)) <= 1))) {
                value = "昨天 "+(time.getHours() < 10 ? ('0' + time.getHours()) : time.getHours()) + ':' + (time.getMinutes() < 10 ? ('0' + time.getMinutes()) : time.getMinutes());
            }
            else {
                value =  (time.getMonth() + 1) + '月' + time.getDate() + '日 '+(time.getHours() < 10 ? ('0' + time.getHours()) : time.getHours()) + ':' + (time.getMinutes() < 10 ? ('0' + time.getMinutes()) : time.getMinutes());
            }
            return value;
        },

        getUsernameByJID: function (jid) {
            return jid.slice(0, jid.indexOf('@'));
        },

        argsToArr: argsToArr,

        // 0 对应 true
        // 1 对应 false
        transformBooleanToInt: function (boolean) {
            if (boolean === true) {
                return 0;
            } else if (boolean === false) {
                return 1;
            } else {
                console.error('你输入的不是 Boolean 类型');
            }
        },

        // 0 对应 true
        // 1 对应 false
        transformIntToBoolean: function (int) {
            if (int === 0) {
                return true;
            } else if (int === 1) {
                return false;
            } else {
                console.error('你输入的既不是 1 也不是 0');
            }
        },

        getParamsDataStr: function () {
            var args = argsToArr(arguments);

            return JSON.stringify(args);
        },

        parseInt: function (value) {
            return window.parseInt(value, 10);
        },

        parseString: function (value) {
            return '' + value;
        },

        bindOnEnter: function (stateName, onEnter, $scope) {
            bindEvent(stateName + Constants.events.onStateEnter, onEnter, $scope);
        },

        bindOnExit: function (stateName, onExit, $scope) {
            bindEvent(stateName + Constants.events.onStateExit, onExit, $scope);
        },

        triggerOnEnter: function (stateName) {
            var args = argsToArr(arguments);

            //console.warn('triggerOnEnter: ', stateName);
            triggerEvent.apply(null, [stateName + Constants.events.onStateEnter].concat(args.slice(1)));
        },

        triggerOnExit: function (stateName) {
            var args = argsToArr(arguments);

            console.warn('triggerOnExit: ', stateName);
            triggerEvent.apply(null, [stateName + Constants.events.onStateExit].concat(args.slice(1)));
        },
        rankingAccording: function (arr) {
            var ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('');
            /* 品牌拼音首字母排序*/
            // clone
            arr = JSON.parse(JSON.stringify(arr));

            var userNameMap = {};
            var userNameList = [];
            angular.forEach(arr, function (userName, index) {
                var initial = userName.initial;
                if (angular.isArray(userNameMap[initial])) {
                    userNameMap[initial].push(userName);
                } else {
                    userNameMap[initial] = [userName];
                }
            });

            angular.forEach(ALPHABET, function (initial) {
                if (userNameMap[initial]) {
                    userNameList.push({
                        initial: initial,
                        userList: userNameMap[initial]
                    });
                }
            });
            return userNameList;
        }
    };

    function argsToArr(args) {
        return slice.apply(args);
    }

    function bindEvent(event, listener, $scope) {
        var off = $rootScope.$on(event, listener);

        $scope.$on('$destroy', function () {

            console.warn('destroy: ', event);
            off();
        });
    }

    function triggerEvent() {
        $rootScope.$broadcast.apply($rootScope, argsToArr(arguments));
    }

    function createCurryCMDJudge(cmdMap) {
        var cmdList = _.values(cmdMap);

        return function (cmd) {
            return cmdList.indexOf(cmd) > -1;
        }
    }
};

JSUtils.$inject = [
    '$rootScope',
    'Constants'
];

module.exports = JSUtils;