/**
 * Created by tapes on 2015/8/31.
 */
var _ = require('underscore');

module.exports = angular.module('app.tabs.circle', [
    'ionic', 'ngMessages', 'ngCookies',
    require('../common').name])

    .config([
        '$stateProvider',
        function ($stateProvider) {

            $stateProvider

                .state('tab.circle', {
                    abstract: true,
                    url: '/circle',
                    // cache : false,  // 放开这个会导致重复进入子页面
                    views: {
                        'tab-circle': require('./main')
                    }
                })
                .state('tab.circle.friends', {
                    url: '',
                    data: {
                        showTabs: true
                    },
                    title : 'tab.circle',
                    cache : false,
                    views: {
                        '': require('./friends')
                    }
                })
                .state('tab.circle.new-friends', {
                    url: '/new-friends',
                    data: {
                        showTabs: false
                    },
                    cache : false,
                    views: {
                        '': require('./new-friends')
                    }
                })

                .state('tab.circle.contact-compare', {
                    url: '/contact-compare',
                    cache : false,
                    views: {
                        '': require('./contact-compare')
                    }
                })

                .state('tab.circle.groups', {
                    url: '/groups',
                    cache : false,
                    views: {
                        '': require('./groups')
                    }
                })

                // 创建群
                .state('tab.circle.groups-create', {
                    url: '/groups/create',
                    cache : false,
                    views: {
                        '': require('./groups-create')
                    }
                })

                .state('tab.circle.find', {
                    url: '/find',
                    cache : false,
                    views: {
                        '': require('./find')
                    }
                })

                .state('tab.circle.find-filter', {
                    url: '/find/filter',
                    cache : false,
                    views: {
                        '': require('./find-filter')
                    }
                })

                .state('tab.circle.user-detail', {
                    url: '/user-detail/{id:int}',
                    cache : false,
                    views: {
                        '': require('./user-detail')
                    }
                })
                .state('tab.circle.search-result', {
                    url: '/find/filter/search-result:result',
                    cache : false,
                    resolve: {},
                    views: {
                        '': require('./search-result')
                    }
                });

        }
    ]);