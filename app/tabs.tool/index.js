/**
 * Created by tapes on 2015/6/30.
 */

module.exports = angular.module('app.tool', ['ngMessages', require('../common').name])


    .config([
        '$stateProvider',
        function ($stateProvider) {
            $stateProvider

                .state('tab.tool', {
                    url: '/tool',
                    data: {
                        didNotNeedLogin: true,
                        showTabs: true
                    },
                    title : 'tab.tool',
                    // cache : false, // 如果不注释掉这个参数，在弹出登录对话框后，这个页面的缓存将清掉，但是这是首页，如果清掉这个缓存将导致页面无法载入的后果
                    views: {
                        'tab-tool': {
                            template: require('./templates/index.html'),
                            controller: 'IndexCtrl'
                        }
                    }
                })

                .state('tab.tool-active', {
                    url: '/tool/active:equipmentId',
                    views: {
                        'tab-tool': {
                            template: require('./templates/active.html'),
                            controller: 'ActiveCtrl'
                        }
                    }
                });
        }
    ])
    .controller('IndexCtrl', require('./controllers/IndexCtrl'))
    .controller('ActiveCtrl', [
        '$scope',
        '$ionicModal',
        'JSCommand',
        '$stateParams',
        'JSCache',
        require('./controllers/ActiveCtrl')
    ])
    /*验证汉字指令*/
    .directive('checkName', [function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$parsers.push(function (value) {
                    if (/[\u4E00-\u9FA5]/g.test(value)) {
                        ngModel.$setValidity('evenNum', true);
                        return value;
                    } else {
                        ngModel.$setValidity('evenNum', false);
                        return value;
                    }
                });
            }
        }
    }])

    /*验证联系方式*/
    .directive('contactInformation', [function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$parsers.push(function (value) {
                    var fixedTelephone = value.match(/\d{3}-\d{8}|\d{4}-\d{7}/);
                    var mobilePhone = value.match(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
                    if (fixedTelephone != null || mobilePhone != null) {
                        ngModel.$setValidity('Contact', true);
                        return value;
                    } else {
                        ngModel.$setValidity('Contact', false);
                        return value;
                    }

                });
            }
        }
    }])
    /*验证腾讯QQ格式*/
    .directive('qciqFormat', [function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$parsers.push(function (value) {
                    // var check =value.match(/^[1-9]d{4,8}$/);
                    var reg = /^[1-9][0-9]{4,9}$/;
                    var qq_Flag = reg.test(value);
                    console.log(qq_Flag);
                    if (qq_Flag) {
                        ngModel.$setValidity('Format', true);
                        return value;
                    } else {
                        ngModel.$setValidity('Format', false);
                        return value;
                    }
                });
            }
        }
    }])

    //验证只能输入字母,下划线,数字 ,中文
    .directive('checkGroupName', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$parsers.push(function (value) {
                    var reg = /^[\u4E00-\u9FA5a-zA-Z0-9_]{1,20}$/;
                    var groupName_Flag = reg.test(value);

                    if (groupName_Flag) {
                        ngModel.$setValidity('groupName', true);
                        return value;
                    } else {
                        ngModel.$setValidity('groupName', false);
                        {
                            return value;
                        }
                    }
                })
            }
        }
    })
;