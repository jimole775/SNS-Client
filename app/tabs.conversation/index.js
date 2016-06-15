/**
 * Created by tapes on 2015/7/17.
 */

var _ = require('underscore');

module.exports = angular.module('app.tabs.conversations', ['ionic', 'ngMessages', 'ngCookies', require('../common').name])

    .config([
        '$stateProvider',
        function ($stateProvider) {

            $stateProvider
                .state('tab.conversations', {
                    abstract: true,
                    url: '/conversations',
                    // cache : false, // 放开这个会导致重复进入子页面
                    views: {
                        'tab-conversations': require('./main')
                    }
                })
                .state('tab.conversations.conversation-list', {
                    url: '',
                    data: {
                        showTabs: true
                    },
                    title : 'tab.conversations',
                    cache : false,
                    views: {
                        '': require('./conversation-list')
                    }
                })
                .state('tab.conversations.conversation', {
                    abstract: true,
                    url: '/{targetId}/?conversationType',
                    views: {
                        '': require('./conversation')
                    },
                    cache : false
                   /* resolve: {
                        targetId: ['$stateParams', function ($stateParams) {
                            return '' + $stateParams.targetId;
                        }],
                        conversationType: ['$stateParams', 'Constants', function ($stateParams, Constants) {
                            return Constants.rongCloud.ConversationType[$stateParams.conversationType]
                        }]
                    }*/
                })
                .state('tab.conversations.conversation.PRIVATE', {
                    url: '',
                    cache : false,
                    views: {
                        '': require('./conversation.PRIVATE')
                    }
                })
                .state('tab.conversations.conversation.GROUP', {
                    url: '',
                    cache : false,
                    views: {
                        '': require('./conversation.GROUP')
                    }
                })
                .state('tab.conversations.group-edit', {
                    url: 'group/{id}/edit',
                    cache : false,
                    /*resolve: {
                        group: ['$stateParams', 'JSCommand', 'JSUtils', function ($stateParams, JSCommand, JSUtils) {
                            return JSCommand.getEditGroupChatList(parseInt($stateParams.id, 10)).then(function (result) {

                                result.group.isAllowStrangerBoolean = JSUtils.transformIntToBoolean(result.group.isAllowStranger);
                                result.group.isAllowSearchBoolean = JSUtils.transformIntToBoolean(result.group.isAllowSearch);
                                result.group.isNoDisturbBoolean = JSUtils.transformIntToBoolean(result.group.isNoDisturb);

                                _.forEach(result.group.members, function (member) {
                                    if (!member.id) {
                                        member.id = member.userId;

                                        member.isChecked = true;
                                        member.selected = 1;

                                        member.userId = undefined;
                                    }
                                });

                                console.log("getEditGroupChatList:", result);
                                return result.group;
                            });
                        }]
                    },*/
                    views: {
                        '': require('./group-edit')
                    }
                })
                .state('tab.conversations.group-message-history', {
                    url: 'group/{targetId}/message-history',
                    cache : false,
                    views: {
                        '': require('./group-message-history')
                    }
                })
                .state('tab.conversations.group-report', {
                    url: 'group/{targetId}/report',
                    cache : false,
                    views: {
                        '': require('./group-report')
                    }
                })
                .state('tab.conversations.group-report-evidence', {
                    url: 'group/{targetId}/report-evidence',
                    cache : false,
                    views: {
                        '': require('./group-report-evidence')
                    }
                })

                //车辆信息品牌
                .state('tab.conversations.vehicleInformation', {
                    url: 'conversations/vehicleInformation:targetId:conversationType',
                    cache : false,
                    //resolve: {
                    //    vehicleInformation: ['ConversationService', '$stateParams', function (ConversationService, $stateParams) {
                    //
                    //        return ConversationService.getVehicleInformation().then(function (result) {
                    //            return result;
                    //        })
                    //    }]
                    //},
                    views: {
                        '': require('./vehicleInformation')
                    }
                })

                //车系
                .state('tab.conversations.vehicleInformation-cars', {
                    url: 'conversations/vehicleInformation-cars:brandId',
                    cache : false,
                    //resolve: {
                    //    vehicleInformation: ['ConversationService', '$stateParams', function (ConversationService, $stateParams) {
                    //        var branId = parseInt($stateParams.brandId);
                    //        return ConversationService.getVehicleInformation(branId, -1).then(function (result) {
                    //            console.log('vehicleInformation', result);
                    //            return result;
                    //        })
                    //    }]
                    //},
                    views: {
                        '': {
                            template: require('./vehicleInformation/cars.html'),
                            controller: require('./vehicleInformation/controller')
                        }
                    }
                })

                //年款
                .state('tab.conversations.vehicleInformation-year-type', {
                    url: 'conversations/vehicleInformation-year-type:brandId:carsSeriesId',
                    cache : false,
                    //resolve: {
                    //    vehicleInformation: ['ConversationService', '$stateParams', function (ConversationService, $stateParams) {
                    //        var branId = parseInt($stateParams.brandId);
                    //        var carsSeriesId = parseInt($stateParams.carsSeriesId);
                    //        return ConversationService.getVehicleInformation(branId, carsSeriesId).then(function (result) {
                    //            console.log('vehicleInformation', result);
                    //            return result;
                    //        })
                    //    }]
                    //},
                    views: {
                        '': {
                            template: require('./vehicleInformation/year-type.html'),
                            controller: require('./vehicleInformation/controller')
                        }
                    }
                })

                .state('tab.conversations.vehicle-fault', {
                    url: 'conversations/vehicleInformation-fault:brandId:carsSeriesId:faultId',
                    cache : false,
                    //resolve: {
                    //    vehicleInformation: ['ConversationService', '$stateParams', function (ConversationService, $stateParams) {
                    //        var branId = parseInt($stateParams.brandId);
                    //        var carsSeriesId = parseInt($stateParams.carsSeriesId);
                    //        var faultId = parseInt($stateParams.faultId);
                    //        return ConversationService.getVehicleInformation(branId, carsSeriesId).then(function (result) {
                    //            _.forEach(result.type, function (yearTypeObj) {
                    //                if (faultId === yearTypeObj.id) {
                    //                    yearTypeObj.selected = true;
                    //                }
                    //            });
                    //            return result;
                    //        })
                    //    }]
                    //},
                    views: {
                        '': {
                            template: require('./vehicleInformation/vehicle-fault-information.html'),
                            controller: require('./vehicleInformation/controller')
                        }
                    },
                    onEnter: ['JSUtils', 'vehicleInformation', function (JSUtils, vehicleInformation) {
                        JSUtils.triggerOnEnter('tab.conversations.vehicleInformation-fault', vehicleInformation);
                    }]
                })

            //群资料查看群好友详情
                .state('tab.conversations.user-detail',{
                    url : 'conversations/user-detail:id',
                    cache : false,
                   /* resolve: {
                        user: ['$stateParams', 'JSCommand', function ($stateParams, JSCommand) {
                            return JSCommand.getUserDetail(parseInt($stateParams.id), true).then(function (result) {
                                return result.user;
                            });
                        }]
                    },*/
                    views:{
                        '': require('./user-detail')
                    }
                });
        }
    ])
    .factory('ConversationService', require('./ConversationService'));
