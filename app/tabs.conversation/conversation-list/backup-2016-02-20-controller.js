/**
 * LGQ backup this file for conversation list on 2016-02-20
 */

var _ = require('underscore');

var ConversationList = function ($scope,
                                 $rootScope,
                                 $state,
                                 $ionicModal,
                                 Constants,
                                 JSUtils,
                                 JSCache,
                                 JSCommand,
                                 conversationData) {

    console.log("enter the conversation list controller...");

    conversationData; //获取列表信息

    $scope.$on('YHJSReceiver', function (event, json) {
        try {

            var status = json["status"];
            if (status == Constants.status.success) {
                // 成功
                var what = json['what'];
                if (what === Constants.YHWhat.rongcloud.getConversationList) {
                    // 获取会话列表的回复
                    conversationData = json.data;

                    _.forEach(conversationData, function (conversationObj) {

                        if (conversationObj.conversationType === "PRIVATE") {
                            JSCommand.rpc.getUserDetail(parseInt(conversationObj.targetId, 10));
                        }
                        else if (conversationObj.conversationType === 'GROUP') {
                            JSCommand.rpc.getEditGroupChatList(parseInt(conversationObj.targetId, 10));
                        }

                        conversationObj.receivedTime = JSUtils.getDateTime(conversationObj.receivedTime)

                    });


                }
                else if (what == Constants.YHWhat.rpc.userDetail) {
                    _.forEach(conversationData, function (conversation) {

                        conversation.__detail__ = json.data.user;

                    });

                    $scope.$apply(function () {
                        $scope.conversationList = conversationData;
                    })

                }
                else if (what == Constants.YHWhat.rpc.editGroupChat) {
                    console.log('group', json.data);

                    _.forEach(conversationData, function (conversation) {
                        conversation.__detail__ = json.data.group;
                    });

                    $scope.$apply(function () {
                        $scope.conversationList = conversationData;
                    })

                }

            }

        }
        catch (error) {
            alert("error" + error);
        }
    });

    function getConversationList() {
        JSCommand.rongcloud.getConversationList();
    }

    getConversationList();

    function getSearchConversationList(searchTargetId, searchContent) {
        $scope.searchConversationList = [];
        JSCommand.rongcloud.rongcloud.getConversationList({
            onSuccess: function (searchConversationList) {
                $scope.searchResult = null;
                _.forEach(searchConversationList, function (conversation, i) {
                    console.log(i, searchConversationList[i].targetId);
                    if (searchConversationList[i].targetId === searchTargetId) {

                        if (conversation.conversationType === 'PRIVATE') {
                            JSCommand.rpc.getUserDetail(parseInt(Number(searchTargetId), 10)).then(function (result) {
                                conversation.__detail__ = result.user;
                            });
                        } else if (conversation.conversationType === 'GROUP') {
                            JSCommand.rpc.getEditGroupChatList(parseInt(Number(searchTargetId), 10)).then(function (result) {
                                conversation.__detail__ = result.group;
                            });
                        }
                        conversation.searchContent = searchContent;
                        conversation.receivedTime = JSUtils.getDateTime(conversation.receivedTime);
                        $scope.searchResult = _.extend(searchConversationList[i]);
                    }
                });

                $scope.searchConversationList.push($scope.searchResult);
            },

            onError: function (errorCode) {

            }
        })
    }

    var _menuModal_ = $ionicModal.fromTemplate(require('./modal-menu.html'), {
        scope: $scope,
        animation: 'slide-right-left'
    });

    $scope.showMenuModal = function () {
        _menuModal_.show();
    };

    $scope.hideMenuModal = function () {
        _menuModal_.hide();
    };

    //搜索是否显示
    $scope.isShowSearch = false;

    $scope.showOrHideSearch = function () {
        $scope.isShowSearch = !$scope.isShowSearch;
        $scope.search.keyword = '';
    };

    //检测是否为数字
    function isNumber(num) {
        var re = /^[0-9]+.?[0-9]*$/;
        if (!re.test(num)) {
            return false;
        }
        else {
            return true;
        }
    }

    //过滤对话内容
    function filterContent(keyword, obj) {
        if (obj.indexOf(keyword) >= 0) {
            return true;
        }
        else {
            return false;
        }
    }

    //进行搜索
    $scope.search = {
        "keyword": ""
    };

    //对话列表是否显示
    $scope.isShowConversationList = true;

    //搜索结果是否显示
    $scope.isShowSearchConversationList = false;

    $scope.$watch('search.keyword', function () {

        if ($scope.search.keyword.toString().trim() === '') {
            $scope.isShowConversationList = true;
            $scope.isShowSearchConversationList = false;
            return false;
        }
        $scope.isShowConversationList = false;
        $scope.isShowSearchConversationList = true;
        $scope.searchConversationList = null;
        for (var i = 0; i < localStorage.length; i++) {
            if (isNumber(Number(localStorage.key(i)))) {
                for (var j = 0; j < JSON.parse(localStorage.getItem(localStorage.key(i))).length; j++) {
                    if (filterContent($scope.search.keyword, JSON.parse(localStorage.getItem(localStorage.key(i)))[j].content.content)) {
                        //getSearchConversationList(localStorage.key(i), JSON.parse(localStorage.getItem(localStorage.key(i)))[j].content.content);
                        break;
                    }
                }
            }
        }
    });

    //***********************************监听消息推送*********************
    $scope.$on(Constants.events.onReceiveMessage, function (event, message) {
        console.log('message', message);
        getConversationList();
    });

//=========================================远程协助 监听 ==============================================================
    //这里是远程协助 首次进入消息 弹出页面
    $rootScope._modalRequestedRemoteAssistance = $ionicModal.fromTemplate(require('./modal-receive-assistance-requests.html'), {
        scope: $scope,
        animation: 'slide-right-left'
    });


    $scope.refuseAssistance = function (id) {
        JSCommand.app.refuseRemoteAssistance(parseInt(id));
    };

    //发送接收协助请求
    $scope.receivingRequest = function (id) {

        JSCommand.app.acceptRemoteAssistance(parseInt(id));

        var Params = {
            id: id,
            value: Constants.differenceRemoteRequest.receivingParty
        };
        JSCommand.app.getCCDPBusinessList(Params);
        //ConversationService.receiveRemoteAssistanceRequests(id).then(function (result) {
        //    console.log('.....', result);
        //    var Params = {
        //        id: id,
        //        value: Constants.differenceRemoteRequest.receivingParty
        //    };
        //    //JSCommand.getCCDPBusinessList(Params);
        //    $scope._modalRequestRemoteAssistance.hide();
        //});
    };

    $scope.$on(Constants.events.pushPrefix + Constants.YHWhat.rpc.refuseRemoteAssistance, function (evet, status, result) {
        $scope._modalRequestRemoteAssistance.hide();
        console.log('Constants.RPC_CMD.push.pushAcceptRemoteAssistance', Constants.YHWhat.rpc.refuseRemoteAssistance);
    });
//================================================远程协助监听=======================================================

};

ConversationList.$inject = [
    '$scope',
    '$rootScope',
    '$state',
    '$ionicModal',
    'Constants',
    'JSUtils',
    'JSCache',
    'JSCommand',
    'conversationData'
];

module.exports = ConversationList;