/**
 * Created by Weidongjian on 2015/12/9.
 */
var _ = require('underscore');

module.exports = angular.module('app.tabs.home', [
    'ionic', require('../common').name
])
    .config([
        '$stateProvider',
        function ($stateProvider) {

            $stateProvider
                .state('tab.home', {
                    abstract: true,
                    url: '/home',
                    // cache : false, // 放开这个会导致重复进入子页面
                    views: {
                        'tab-home': require('./main')
                    }
                })

                .state('tab.home.my-home-page', {
                    url: '',
                    data: {
                        showTabs: true
                    },
                    title : 'tab.home',
                    cache : false,
                    views: {
                        '': require('./my-home-page')
                    }
                })

                .state('tab.home.person-data', {
                    url: './home/person-data',
                    cache : false,
                    views: {
                        '': require('./person-data')
                    }
                })

                .state('tab.home.real-name', {
                    url: './home/person-data/real-name',
                    cache : false,
                    views: {
                        '': require('./real-name')
                    }
                })

                .state('tab.home.expert-setting', {
                    url: './home/expert-setting:userId',
                    cache : false,
                    views: {
                        '': require('./expert-setting')
                    }
                })

                .state('tab.home.choose-brand', {
                    url: './home/choose-brand:userId',
                    cache : false,
                    views: {
                        '': require('./choose-brand')
                    }
                })

                .state('tab.home.choose-service-project', {
                    url: '/home/choose-service-project:userId',
                    cache : false,
                    views: {
                        '': require('./choose-service-project')
                    }
                })
                .state('tab.home.assist-record', {
                    url: '/home/assist-record',
                    cache : false,
                    views: {
                        '': require('./assist-record')
                    }
                })

                .state('tab.home.recent-consultation', {
                    url: '/.home/recent-consultation:userId',
                    cache : false,
                    views: {
                        '': require('./recent-consultation')
                    }
                })
        }
    ])


    .directive('evaluationState', ['Constants', function (Constants) {
        return {
            restrict: 'E',
            link: function (scope, element, attrs) {
                var state = Constants.evaluationState[attrs.state];
                element.html(state);
            }
        }
    }]);
