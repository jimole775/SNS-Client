/**
 * Created by tapes on 2015/9/23.
 */

var _ = require('underscore');

/*
[
    {
        "content": {
            "content": "他咯哦YY"
        },
        "conversationType": "PRIVATE",
        "extra": "",
        "messageDirection": "SEND",
        "messageId": 2,
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
        "targetId": "19"
    },
    {
        "content": {
            "content": "啦咯啦咯啦咯了"
        },
        "conversationType": "PRIVATE",
        "extra": "",
        "messageDirection": "SEND",
        "messageId": 3,
        "objectName": "RC:TxtMsg",
        "receivedStatus": {
            "flag": 1,
            "isDownload": false,
            "isListened": false,
            "isRead": true
        },
        "receivedTime": 1455951345045,
        "senderUserId": "30",
        "sentStatus": "SENT",
        "sentTime": 1455951345689,
        "targetId": "19"
    }
]*/

var Conversation = function ($scope,
                             $ionicScrollDelegate,
                             $stateParams,
                             Constants,
                             JSUtils,
                             JSCache,
                             JSCommand,
                             $ionicModal) {


    console.log('enter the conversation controller...');
    var targetId = $stateParams.targetId;
    $scope.targetId = targetId;
    console.log("$scope.targetId",$scope.targetId);
    $scope.status = {
        typing: 1,
        waitForRecord: 2,
        showingSelectFeatures: 3,
        recording: 4
    };
    $scope.currentStatus = $scope.status.typing;
    $scope.form = {
        text: ''
    };

    var text; //发送消息
    var conversationType = $stateParams.conversationType;
    switch (conversationType) {
        case 'GROUP':
            conversationType = 3;
            break;
        case 'PRIVATE':
            conversationType = 1;
            break;
    }

    /*
       在这里声明消息队列
     */
    $scope.messageList = [];

    var textMessage = {};

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

            var status = json.status;
            if (status === Constants.status.success) {
                var what = json.what;
                if (what === Constants.YHWhat.rongcloud.getConversation) {
                    console.log("conversation got the history message");
                    // 这里获取到最新的消息列表，包含所有未读消息，如果未读消息不超过20条，则会包含历史消息。
                    $scope.messageList = json.data;
                    _.forEach($scope.messageList, function (messageObj) {
                        messageObj.receivedTime = JSUtils.getDateTime(messageObj.receivedTime);
                        messageObj.sentTime = JSUtils.getDateTime(messageObj.sentTime);
                    });
                    console.log("个人未读消息:",$scope.messageList);
                }

                else if (what === Constants.YHWhat.rongcloud.sendTestMessage) {
                    // 如果发生消息成功，则会把消息存入到消息列表中
                        $scope.safeApply(function () {
                        $scope.messageList.push(json.data);
                            console.log("消息：",$scope.messageList);
                        });
                    //if ($scope.targetId === json.data.targetId) {
                    //    $scope.safeApply(function () {
                    //        $scope.messageList.push(textMessage);
                    //    });
                    //}


                    //if ($scope.targetId === json.data.targetId && angular.isDefined($scope.messageList)) {
                    //    $scope.$apply(function () {
                    //        $scope.messageList.push(json.data);
                    //    });
                    //} else {
                    //    $scope.$apply(function () {
                    //        $scope.messageList = [];
                    //        $scope.messageList.push(json.data)
                    //    });
                    //}
                }else if(what === Constants.YHWhat.rongcloud.sendImageMewssage){
                    $scope.safeApply(function () {
                        $scope.messageList.push(json.data);
                    });
                }else if(what === Constants.YHWhat.rongcloud.sendVoiceMessage){
                    $scope.safeApply(function () {
                        $scope.messageList.push(json.data);
                    });
                }
                /*else if(what === Constants.YHWhat.ccdp.CCDP_SEND_FILES){
                    console.log("文件发送成功！");
                    $scope.safeApply(function () {
                        console.log("files data：",json.data);
                    });
                }
                else if(what === Constants.YHWhat.ccdp.CCDP_GET_FILES){
                    console.log("监听到文件！");
                    $scope.safeApply(function () {
                        //$scope.messageList.push(json.data);
                        console.log("files data!!!!：",json.data);
                    });
                }*/
                else if(what === Constants.YHWhat.app.sendFiles){
                    // 发送文件
                    console.log("发送文件成功~~~~~~~~~");
                    $scope.safeApply(function () {
                        $scope.messageList.push(json.data);
                        console.log("files data：",json.data);
                    });
                }
                else if (what === Constants.YHWhat.rongcloud.getLatestMessages) {
                    // 这个接口在 新版-2016-02-20 中间暂时没有用到，先注释掉
                    _.forEach(json.data, function (messageObj) {
                        if ($scope.targetId === messageObj.targetId) {
                            $scope.$apply(function () {
                                $scope.messageList.push(messageObj);
                            });
                        }
                    });
                }
            } else {
                console.log("Login fail:" + json["reason"])
            }

        } catch (error) {

        }
    });


    $scope.listHistoryMessage = function(){
        /*
         首先获取消息列表
         */
        JSCommand.rongcloud.getConversation(targetId, conversationType);
    };
    $scope.listHistoryMessage();


    $scope.switchStatusTo = function (status) {
        $scope.currentStatus = status;
    };

    $scope.handleRecord = function () {
        console.log('handleRecord');

        if ($scope.currentStatus === $scope.status.waitForRecord) {
            console.log("点击开始");
            JSCommand.app.startRecord();
            $scope.switchStatusTo($scope.status.recording);
        } else if ($scope.currentStatus === $scope.status.recording) {
            JSCommand.app.stopRecord(targetId,conversationType);
            console.log("点击结束");
            $scope.switchStatusTo($scope.status.waitForRecord);
        }

    };

    $scope.playVoice = function (message) {
        //console.log('message::',message);
        JSCommand.app.playVoice(message.content.mUri.path.decoded);
    };

    var checkImgModal = $ionicModal.fromTemplate(require('./check-img.html'), {
        scope: $scope,
        animation: 'slide-right-left'
    });
    $scope.checkImg=function (message) {
        $scope.localUriString=message.content.mLocalUri.uriString;
        console.log('message::',$scope.localUriString);
        checkImgModal.show();
    };
    $scope.closeModal=function(){
        checkImgModal.hide();
    };
    $scope.handleClickConversationArea = function () {
        if ($scope.currentStatus == $scope.status.showingSelectFeatures) {
            $scope.switchStatusTo($scope.status.typing);
        }
    };

    $scope.sendMessage = function () {
        text = $scope.form.text.trim();
        console.log('text: ', text);
        // 空字符串不发送
        if (text.length <= 0) {
            return;
        }

        //textMessage = {
        //    "content": {
        //        "content": text
        //    },
        //    "conversationType": "PRIVATE",
        //    "extra": "",
        //    "messageDirection": "SEND",
        //    "messageId": 2,
        //    "objectName": "RC:TxtMsg",
        //    "receivedStatus": {
        //        "flag": 1,
        //        "isDownload": false,
        //        "isListened": false,
        //        "isRead": true
        //    },
        //    "receivedTime": 0,
        //    "senderUserId": "30",
        //    "sentStatus": "SENT",
        //    "sentTime": 0,
        //    "targetId": targetId
        //};

        JSCommand.rongcloud.sendTextMessage(targetId, text, conversationType);
        $scope.form.text = '';

        //var message = {};
        //message["what"] = Constants.YHWhat.rongcloud.sendTestMessage;
        //message["status"] = Constants.status.success;
        //message["data"] = {"targetId":19};
        //var sMessage = JSON.stringify(message);
        //window.YHAndroidToJs.sendToJS(sMessage);
    };


    var offReceiveMessage = $scope.$on(Constants.events.onReceiveMessage, function (event, message) {
        if ($scope.conversation && message.senderUserId === targetId) {

            $scope.$apply(function () {
                $scope.messageList.push(message);
            });
        } else {
            getConversation();
        }
    });

    $scope.$on('$destroy', function () {
        //offReceiveMessage();
        JSCommand.rongcloud.exitConversation(targetId, conversationType);
    });

    $scope.$watchCollection('messageList', function () {
        $ionicScrollDelegate.scrollBottom();
        localStorage.setItem(targetId, JSON.stringify($scope.messageList));
    });


    /*function getHistoryMessages(resultCallback) {
     JSCommand.getHistoryMessages(
     Constants.rongCloud.ConversationType[$scope.conversation.conversationType],
     $scope.conversation.targetId,
     $scope.conversation.latestMessageId,
     50,
     resultCallback);
     }*/

    function getLatestMessages() {
        JSCommand.rongcloud.getLatestMessages(targetId, conversationType, 20);
    }
};

Conversation.$inject = [
    '$scope',
    '$ionicScrollDelegate',
    '$stateParams',
    'Constants',
    'JSUtils',
    'JSCache',
    'JSCommand',
    '$ionicModal'
];

module.exports = Conversation;