/**
 * Created by tapes on 2015/9/23.
 */

var _ = require('underscore');

/*  会话列表的信息
[
    {
        "conversationTitle": "",
        "conversationType": "PRIVATE",
        "draft": "",
        "isTop": false,
        "latestMessage": {
            "content": "他咯哦YY"
        },
        "latestMessageId": 2,
        "objectName": "RC:TxtMsg",
        "receivedStatus": {
            "flag": 1,
            "isDownload": false,
            "isListened": false,
            "isRead": true
        },
        "receivedTime": 1455941397742,
        "senderUserId": "30",
        "sentStatus": "SENT",
        "sentTime": 1455941398574,
        "targetId": "19",
        "unreadMessageCount": 0
    },
    {
        "conversationTitle": "",
        "conversationType": "PRIVATE",
        "draft": "",
        "isTop": false,
        "latestMessage": {
            "content": "all他啊"
        },
        "latestMessageId": 1,
        "objectName": "RC:TxtMsg",
        "receivedStatus": {
            "flag": 1,
            "isDownload": false,
            "isListened": false,
            "isRead": true
        },
        "receivedTime": 1455941377323,
        "senderUserId": "30",
        "sentStatus": "SENT",
        "sentTime": 1455941378563,
        "targetId": "33",
        "unreadMessageCount": 0
    }
]
*/

/* 这是用户详情的信息
"user": {
    "attentionCount": null,
        "attento": null,
        "brandList": [
        {
            "brandName": "马萨拉蒂",
            "desc_c": null,
            "icon": "masaladi.png",
            "id": 1,
            "initial": null
        },
        {
            "brandName": "宝马",
            "desc_c": null,
            "icon": "BMW_png.png",
            "id": 2,
            "initial": null
        },
        {
            "brandName": "江淮",
            "desc_c": null,
            "icon": "jh.png",
            "id": 4,
            "initial": null
        }
    ],
        "description": "林中的小熊",
        "gold": 1,
        "grade": 1,
        "icon": "84_avatar_middle.jpg",
        "id": 33,
        "initial": "B",
        "isAuthentication": null,
        "mobile": null,
        "nickName": "坂上智代",
        "nickNameUpdateTime": null,
        "notEvaluateCount": 0,
        "popularity": 650,
        "relation": 2,
        "resolvedCount": 0,
        "serveEndTime": "18:00",
        "serveList": [
        {
            "classId": 2,
            "description": "服务描述4",
            "id": 4,
            "recommendGoldHigh": null,
            "recommendGoldLow": null,
            "serveName": "发动机维修",
            "updateTime": null
        },
        {
            "classId": 1,
            "description": "服务描述5",
            "id": 5,
            "recommendGoldHigh": null,
            "recommendGoldLow": null,
            "serveName": "报废",
            "updateTime": null
        }
    ],
        "serveStartTime": "9:00",
        "sex": 2,
        "skilledList": [
        {
            "brandId": 1,
            "description": "描述1",
            "id": 1,
            "img": null,
            "skilledName": "技能1",
            "stype": 1,
            "updateTime": null
        },
        {
            "brandId": 2,
            "description": "描述2",
            "id": 2,
            "img": null,
            "skilledName": "技能2",
            "stype": 1,
            "updateTime": null
        },
        {
            "brandId": 4,
            "description": "描述4",
            "id": 4,
            "img": null,
            "skilledName": "技能4",
            "stype": 1,
            "updateTime": null
        }
    ],
        "state": null,
        "userName": "13737725239"
}
*/

/* 群信息
{
    "group": {
        "advocateId": 20,
        "groupName": "测试一群",
        "groupNickName": "",
        "icon": "1420538614536.jpeg",
        "id": 38,
        "isAllowSearch": true,
        "isAllowStranger": true,
        "isNoDisturb": true,
        "members": [
        {
            "groupId": 38,
            "icon": "84_avatar_middle.jpg",
            "isNoDisturb": true,
            "nickName": "坂上智代",
            "userId": 33,
            "userName": "13737725239"
        },
        {
            "groupId": 38,
            "icon": "1420538614536.jpeg",
            "isNoDisturb": true,
            "nickName": "测试-男♂",
            "userId": 129,
            "userName": "18249988914"
        },
        {
            "groupId": 38,
            "icon": "34.gif",
            "isNoDisturb": true,
            "nickName": "大家好，我是昵称111",
            "userId": 96,
            "userName": "15507898501"
        },
        {
            "groupId": 38,
            "icon": "engineer-Zhao.png",
            "isNoDisturb": true,
            "nickName": "猪1号",
            "userId": 41,
            "userName": "13077714217"
        },
        {
            "groupId": 38,
            "icon": "84_avatar_middle.jpg",
            "isNoDisturb": true,
            "nickName": "111",
            "userId": 114,
            "userName": "13737725203"
        },
        {
            "groupId": 38,
            "icon": "01.png",
            "isNoDisturb": true,
            "nickName": "测试-女♀",
            "userId": 20,
            "userName": "18577826091"
        }
    ],
        "state": 1,
        "updateTime": 1454396527000
}
*/

var ConversationList = function ($scope,
                                 $rootScope,
                                 $state,
                                 $ionicModal,
                                 Constants,
                                 JSUtils,
                                 JSCache,
                                 JSCommand,
                                 $ionicTabsDelegate) {

    console.log("enter the conversation list controller...");

    //这里存储的是会话列表的信息,可以参考上面的信息
    $scope.conversationList = [];
    $scope.remoteMinor = [];
    $scope.getPerUnrMessageList=[];

    $scope.safeApply = function(fn) {
        var phase = this.$root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };
    $scope.$on('YHJSReceiver', function (event, json) {
        try {
            console.log("conversation list receiver....");
            var status = json["status"];
            if (status == Constants.status.success) {
                // 成功
                var what = json['what'];
                if (what === Constants.YHWhat.rongcloud.getConversationList) {
                    console.log("json data is " + json.data);
                    // 获取会话列表的回复
                    $scope.conversationList = json.data;
                    // $scope.conversationList = JSON.parse(json.data);

                    _.forEach($scope.conversationList, function (conversationObj) {

                        if (conversationObj.conversationType === "PRIVATE") {
                            JSCommand.ccdp.queryUserDetail(parseInt(conversationObj.targetId, 10));
                        }
                        else if (conversationObj.conversationType === 'GROUP') {
                            JSCommand.ccdp.queryGroupDetail(parseInt(conversationObj.targetId, 10));
                        }

                        conversationObj.receivedTime = JSUtils.getDateTime(conversationObj.receivedTime)

                    });
                }
                else if (what == Constants.YHWhat.ccdp.CCDP_QUERY_USERDETAILINFO) {
                    var user_json = json.data.user;
                    var user_id = user_json["id"];
                    _.forEach($scope.conversationList, function (conversation) {
                        var targetId = conversation["targetId"];
                        if(targetId == user_id){
                            conversation.__detail__ = json.data.user;
                        }
                    });

                    $scope.$apply(function () {
                        $scope.conversationList = $scope.conversationList;
                    })

                }
                else if(what == Constants.YHWhat.ccdp.CCDP_PUSH_REQASSIST){

                    /*
                     {
                     "msgs":[
                     {
                     "id":0,
                     "value":[
                         {
                             "id":114,
                             "icon":"1456455960271.png",
                             "sex":1,
                             "nickName":"111记性不大好",
                             "userName":"13737725203"
                         }
                     ],
                     "type":1,
                     "msg":"请求远程协助的人"
                     }
                     ]
                     }
                     */
                    try{
                        var data = json['data'];
                        var firstMessage = [];
                        try{
                            var msgs = JSON.parse(data);
                            firstMessage = msgs['msgs'][0];
                        }
                        catch(error){
                            console.log("not json format data:" + json);
                        }
                        if(firstMessage.length == 0){
                            firstMessage = data['msgs'][0];
                        }
                        var val = firstMessage['value'];
                        $scope.remoteMinor = val[0];
                        showModal();
                        // $scope._modalRequestedRemoteAssistance.show();
                    }
                    catch(error){

                        console.log("解析远程协助数据失败,", error);
                    }
                }
                else if(what == Constants.YHWhat.ccdp.CCDP_END_ASSIST){
                    // $scope._modalRequestRemoteAssistance.hide();
                    hideModal();
                }
                else if(what == Constants.YHWhat.ccdp.CCDP_ACCEPT_ASSIST){
                    // 我接收到服务器的接收远程协助的指令
                    /*
                     {
                     "assistId":2
                     "major":20
                     }
                     */
                    var data = json['data'];
                    if(data != null){
                        var major = 0;
                        try{
                            var jsondata = JSON.parse(data);
                            major = jsondata['major'];
                        }
                        catch(error){
                            console.log("not json format data:" + json);
                        }
                        if(major == 0){
                            major = data['major'];
                        }
                        var Params = {
                            id: major,
                            value: Constants.differenceRemoteRequest.receivingParty
                        };
                        JSCommand.app.getCCDPBusinessList(Params);
                        // $scope._modalRequestRemoteAssistance.hide();
                        hideModal();
                    }
                    else{
                        console.log("wrong data for accept assist.");
                        // $scope._modalRequestRemoteAssistance.hide();
                        hideModal();
                    }
                }
                else if (what == Constants.YHWhat.ccdp.CCDP_QUERY_GROUPINFO) {
                    var group_json = json.data.group;
                    var group_id = group_json["id"];
                    _.forEach($scope.conversationList, function (conversation) {
                        var targetId = conversation["targetId"];
                        if(targetId == group_id) {
                            conversation.__detail__ = json.data.group;
                        }
                       /* var conversationType=conversation["conversationType"];
                        switch (conversationType) {
                            case 'GROUP':
                                conversationType = 3;
                                break;
                            case 'PRIVATE':
                                conversationType = 1;
                                break;
                        }

                        var getPerUnrMessages={
                            targetId:'',
                            conversationType:''
                        };
                        getPerUnrMessages.targetId=targetId;
                        getPerUnrMessages.conversationType=conversationType;
                        $scope.getPerUnrMessageList.push(getPerUnrMessages);*/
                        //JSCommand.rongcloud.getPersonalUnreadMessages(targetId, conversationType);
                        //console.log("targetId~~~~~~~~~",targetId);
                    });
                    $scope.$apply(function () {
                        $scope.conversationList = $scope.conversationList;
                    })
                }
                else if (what == Constants.YHWhat.rongcloud.personalUnreadMessages) {
                    $scope.perUnrMessages=json.data;
                }
                else if (what === Constants.YHWhat.rongcloud.getLatestMessages) {
                    // 实时更新消息
                    _.forEach(json.data, function (messageObj) {
                        var targetId = messageObj.targetId;
                        _.forEach($scope.conversationList, function (conversation) {
                            if(targetId == conversation.targetId) {
                                conversation.unreadMessageCount++;
                                conversation.latestMessage.content=messageObj.content.content;
                                $scope.safeApply(function(){
                                    $scope.conversationList = $scope.conversationList;
                                });
                            }
                        });
                    });
                }
            }

        }
        catch (error) {
            alert("error" + error);
        }
    });


    //JSCommand.rongcloud.getPersonalUnreadMessages(targetId, conversationType);
    $scope.getConversationList = function(){
        /*
         首先获取消息列表
         */
        // 首先获取会话列表
        JSCommand.rongcloud.getConversationList();

        //// 模拟融云数据回复
        //var message = {};
        //message["what"] = Constants.YHWhat.rongcloud.getConversationList;
        //message["status"] = Constants.status.success;
        //message["data"] = '[{"conversationTitle":"","conversationType":"PRIVATE","draft":"","isTop":false,"latestMessage":{"content":"他咯哦YY"},"latestMessageId":2,"objectName":"RC:TxtMsg","receivedStatus":{"flag":1,"isDownload":false,"isListened":false,"isRead":true},"receivedTime":1455941397742,"senderUserId":"30","sentStatus":"SENT","sentTime":1455941398574,"targetId":"19","unreadMessageCount":0},{"conversationTitle":"","conversationType":"PRIVATE","draft":"","isTop":false,"latestMessage":{"content":"all他啊"},"latestMessageId":1,"objectName":"RC:TxtMsg","receivedStatus":{"flag":1,"isDownload":false,"isListened":false,"isRead":true},"receivedTime":1455941377323,"senderUserId":"30","sentStatus":"SENT","sentTime":1455941378563,"targetId":"33","unreadMessageCount":0}]';
        //var sMessage = JSON.stringify(message);
        //window.YHAndroidToJs.sendToJS(sMessage);
        //
        //
        // 模拟数据回复
        //var message = {};
        //message["what"] = Constants.YHWhat.ccdp.CCDP_PUSH_REQASSIST;
        //// message["what"] = Constants.YHWhat.ccdp.CCDP_REQ_ASSIST;
        //message["status"] = Constants.status.success;
        //message["data"] = '{"msgs":[{"id":0,"value":[{"id":114,"icon":"1456455960271.png","sex":1,"nickName":"111记性不大好","userName":"13737725203"}],"type":1,"msg":"请求远程协助的人"}]}';
        //var sMessage = JSON.stringify(message);
        //window.YHAndroidToJs.sendToJS(sMessage);
    };
    $scope.getConversationList();


    function showModal(){
        $scope.modalRequestedRemoteAssistance = $ionicModal.fromTemplate(require('./modal-receive-assistance-requests.html'), {
            scope: $scope,
            animation: 'slide-right-left'
        });
        $scope.modalRequestedRemoteAssistance.show();
    }

    function hideModal(){
        if(angular.isDefined($scope.modalRequestedRemoteAssistance)){
            $scope.modalRequestedRemoteAssistance.hide();
            $scope.modalRequestedRemoteAssistance.remove();
        }
    }

    function getSearchConversationList(searchTargetId, searchContent) {
        $scope.searchConversationList = [];
        JSCommand.rongcloud.getConversationList({
            onSuccess: function (searchConversationList) {
                $scope.searchResult = null;
                _.forEach(searchConversationList, function (conversation, i) {
                    console.log(i, searchConversationList[i].targetId);
                    if (searchConversationList[i].targetId === searchTargetId) {

                        if (conversation.conversationType === 'PRIVATE') {
                            JSCommand.ccdp.queryUserDetail(parseInt(Number(searchTargetId), 10)).then(function (result) {
                                conversation.__detail__ = result.user;
                            });
                        } else if (conversation.conversationType === 'GROUP') {
                            JSCommand.ccdp.queryGroupDetail(parseInt(Number(searchTargetId), 10)).then(function (result) {
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
    $scope.gotoAddFriend= function () {
        $ionicTabsDelegate.$getByHandle('my-handle').select(1);
        $state.go('tab.circle.find');
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
    $scope.refuseAssistance = function (id) {
        JSCommand.ccdp.finishRemoteAssist(parseInt(id));
        hideModal();
    };

    //发送接收协助请求
    $scope.receivingRequest = function (id) {
        JSCommand.ccdp.acceptRemoteAssist(parseInt(id));
        hideModal();

        //// 模拟数据回复
        //var message = {};
        //message["what"] = Constants.YHWhat.ccdp.CCDP_ACCEPT_ASSIST;
        //message["status"] = Constants.status.success;
        //message["data"] = '{"assistId":2,"major":20}';
        //var sMessage = JSON.stringify(message);
        //window.YHAndroidToJs.sendToJS(sMessage);
    };


    $rootScope.$on('YHRemote', function(event, json){
        try{
            $scope.$broadcast('YHJSReceiver', json);
        }
        catch(error){

        }
    });

    $rootScope.$on('YHPushMessages', function (event, json) {
        try{
            $scope.$broadcast('YHJSReceiver', json);
        }
        catch(error){

        }
    });

    
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
    '$ionicTabsDelegate'
];

module.exports = ConversationList;