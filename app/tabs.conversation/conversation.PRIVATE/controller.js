/**
 * Created by tapes on 2015/9/23.
 */

var _ = require('underscore');

var Conversation = function ($scope,
                             $stateParams,
                             $ionicHistory,
                             $ionicScrollDelegate,
                             $ionicModal,
                             Constants,
                             JSCommand,
                             JSCache,
                             $rootScope,
                             $interval) {

    console.log('enter the conversation private controller...');
    $scope.showDownFiles=false;
    // 这里就是与我对话的用户ID
    $scope.targetId = $stateParams.targetId;

    // 我自己的信息
    $scope.majorUser = JSCache.get(Constants.YHCache.loginInfo);

    // 与我对话的用户
    $scope.minor = [];

    // 设置会话类型为私聊
    $scope.conversationType = Constants.rongCloud.ConversationType.PRIVATE;

    // 本次协助ID
    $scope.assistId = 0;

    $scope.$on('YHJSReceiver', function (event, json) {
        try {
            var status = json.status;
            if(status === Constants.status.success){
                var what = json.what;
                if(what === Constants.YHWhat.ccdp.CCDP_QUERY_USERDETAILINFO){
                    // 这个是我进入单聊界面时发起的查询用户详情后，服务器返回的对方用户资料，一般包含昵称，头像，等级等信息
                    $scope.$apply(function(){
                        $scope.minor = json.data.user;
                        console.log("$scope.minor",$scope.minor);
                    })
                }
                else if (what === Constants.YHWhat.app.CCDPBusinessAPP2PC) {

                }
                else if(what === Constants.YHWhat.ccdp.CCDP_REQ_ASSIST){
                    // 我接收到服务器返回的发起远程协助的指令
                    $scope.handleShowModal('RequestRemoteAssistance');
                }
                else if (what === Constants.YHWhat.ccdp.CCDP_END_ASSIST) {
                    // 我接收到的服务器返回的拒绝远程协助的指令
                    $scope.handleHideModal('RequestRemoteAssistance');
                    $rootScope._modalRequestedRemoteAssistance.hide();
                }
                else if(what == Constants.YHWhat.ccdp.CCDP_PUSH_REQASSIST){

                }
                else if (what === Constants.YHWhat.ccdp.CCDP_PUSH_ENDASSIST) {
                    // 我收到服务器推送给我的远程协助结束指令
                    $scope.handleHideModal('RequestRemoteAssistance');
                    $rootScope._modalRequestedRemoteAssistance.hide();
                }
                else if(what === Constants.YHWhat.ccdp.CCDP_PUSH_ACCEPTASSIST){
                    // 我收到服务器推送给我的远程协助接受指令
                    var Params = {
                        id: parseInt($scope.targetId),
                        value: Constants.differenceRemoteRequest.initiator
                    };

                    JSCommand.app.getCCDPBusinessList(Params);
                    $scope.handleHideModal('RequestRemoteAssistance');
                }
                else if(what === Constants.YHWhat.app.sendPic){
                    // 发送图片
                    console.log("图片发送成功！");
                }
                else if(what === Constants.YHWhat.app.downFiles){
                    // 发送文件
                    console.log("文件下载成功!");
                    $scope.downFilesMessage=json.data;
                    console.log("$scope.downFilesMessage!",$scope.downFilesMessage);
                    $scope._modalisDownFiles.show();
                    var m = 10;
                    $scope.promptTime = $interval(function () {
                        m--;
                        if (m <= 0) {
                            $scope._modalisDownFiles.hide();
                            $scope.showDownFiles=true;
                        }
                    }, 1000);
                }

            }else{
                console.log("Login fail:" + json["reason"]);
            }

        } catch (error) {

        }
    });
    
    //发送图片
    $scope.sendPicClick= function () {
        JSCommand.app.sendPicCont($stateParams.targetId,parseInt(1));
    };
    console.log('$scope.majorUser',$scope.majorUser);
    //文件传输
    $scope.sendFilesClick= function () {
        JSCommand.app.sendFilesCont($stateParams.targetId,parseInt(1));
    };
    //文件下载
    $scope.downFilesClick= function (messages) {
        var userId=$scope.majorUser.id;
        if(userId != messages.senderUserId){
            JSCommand.app.downFilesCont(messages.senderUserId,messages.content.content,messages.content.fileName);
        }
    };
    $scope._modalisDownFiles = $ionicModal.fromTemplate(require('./isDownFiles.html'), {
        scope: $scope,
        animation: 'slide-right-left'
    });
    $scope.closeModal= function () {
        $scope._modalisDownFiles.hide();
    };
    /*
      查与我对话的用户详情
     */
    JSCommand.ccdp.queryUserDetail(parseInt( $scope.targetId, 10));

    $scope._modalRequestRemoteAssistance = $ionicModal.fromTemplate(require('./modal-request-remote-assistance.html'), {
        scope: $scope,
        animation: 'slide-right-left'
    });

    $scope.handleShowModal = function (modalName) {
        var modal = $scope['_modal' + modalName];
        if (modal && modal.show) {
            modal.show();
        } else {
            console.log('modal: ', '_modal' + modalName, ' 不存在');
        }
    };

    $scope.handleHideModal = function (modalName) {
        var modal = $scope['_modal' + modalName];
        if (modal && modal.hide) {
            modal.hide();
        } else {
            console.log('modal: ', '_modal' + modalName, ' 不存在');
        }
    };

    //var targetId;
    //var getProfile =JSCache.getProfile();
    $scope.handleShowRequestRemoteAssistance = function () {
        JSCommand.ccdp.requestRemoteAssist($scope.targetId);

        //// 模拟数据回复
        //var message = {};
        //// message["what"] = Constants.YHWhat.ccdp.CCDP_PUSH_REQASSIST;
        //message["what"] = Constants.YHWhat.ccdp.CCDP_REQ_ASSIST;
        //message["status"] = Constants.status.success;
        //message["data"] = '';
        //var sMessage = JSON.stringify(message);
        //window.YHAndroidToJs.sendToJS(sMessage);
    };

    $scope.handleHideRequestRemoteAssistance = function () {
        JSCommand.ccdp.finishRemoteAssist($scope.targetId);

        //// 模拟数据回复
        //var message = {};
        //message["what"] = Constants.YHWhat.ccdp.CCDP_END_ASSIST;
        //message["status"] = Constants.status.success;
        //message["data"] = '';
        //var sMessage = JSON.stringify(message);
        //window.YHAndroidToJs.sendToJS(sMessage);
    };

    $scope.APP2PCRequestRemoteAssistance = function () {

        //JSCommand.CCDPBusinessAPP2PC({
        //    onSuccess : function (successMessage){
        //        console.log('successMessage',successMessage);
        //    },
        //    onError : function(){
        //
        //    }
        //})
        JSCommand.app.CCDPBusinessAPP2PC();
    };

    //监听返回键
    //$scope.$on(Constants.events.yhAppCallJs + Constants.APP_CMD.push.keyPressed, function (event, status, result) {
    //    //console.log('arguments',arguments)
    //    $scope._modalRequestRemoteAssistance.hide();
    //
    //});
    $scope.$on('$destroy', function () {
        $scope._modalRequestRemoteAssistance.remove();
    });
};

Conversation.$inject = [
    '$scope',
    '$stateParams',
    '$ionicHistory',
    '$ionicScrollDelegate',
    '$ionicModal',
    'Constants',
    'JSCommand',
    'JSCache',
    '$rootScope',
    '$interval'
];

module.exports = Conversation;