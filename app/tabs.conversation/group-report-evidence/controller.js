/**
 * Created by haicheng on 2015/11/24.
 */
var _ = require('underscore');
var ContactReportEvidence = function ($scope,
                                      $state,
                                      $ionicModal,
                                      $stateParams,
                                      $ionicPopup,
                                      JSCommand,
                                      JSUtils,
                                      JSCache,
                                      Constants) {

    console.log('enter the contact report evidence controller...');

    $scope.groupReport = {
        groupId: "",
        specificReasons: "",
        chatEvidence: ""
    };

    $scope.$on('YHJSReceiver', function (event, json) {
        try {
            var what = json.what;
            if (what === Constants.YHWhat.app.previewImage) {
                var status = json.status;
                if (status === Constants.status.success) {

                    $scope.picEvidence.push({accessory: json.pictureResult});

                } else {
                    console.log("Login fail:" + json["reason"])
                }
            }
            else if (what === Constants.YHWhat.ccdp.CCDP_ADD_REPORTGROUP) {
                var status = json.status;
                if (status === Constants.status.success) {

                    JSCache.remove('reportReason');
                    $state.go('tab.conversations.group-edit', {
                        id: $scope.groupReport.groupId
                    });

                } else {
                    console.log("Login fail:" + json["reason"])
                }
            }

        } catch (error) {

        }
    });

    $scope.groupReport.groupId = $stateParams.targetId;
    //$scope.groupReport.specificReasons = sessionStorage.getItem('reason');
    $scope.groupReport.specificReasons = JSCache.get('reportReason');


    //聊天记录获取-----写这里~~~
    $scope.getChooseChatRecord = function () {
        $scope.groupReport.chatEvidence = "this a message";
    };
    //图片获取-----写这里~~~
    $scope.picEvidence = [];

    $scope.getChoosePic = function () {
        //AlbumService.getHeadPortrait({
        //    onSuccess: function (pictureResult) {
        //        $scope.picEvidence.push({accessory: pictureResult});
        //    },
        //    onError: function (errorMessage) {
        //
        //    }
        //});
        var key = -1;
        JSCommand.app.getPreviewImage($scope.groupReport.groupId, key)
    };

    //提交数据
    var confirmPopup;
    $scope.sendReason = function () {
        //当聊天记录和图片其中一项存在的时候,执行-----并提交数据
        if ($scope.picEvidence.length > 0 || $scope.groupReport.chatEvidence !== "") {
            var groupId = $scope.groupReport.groupId;
            var reason = $scope.groupReport.specificReasons;
            var chatEvidence = $scope.groupReport.chatEvidence;
            var picEvidence = $scope.picEvidence;

            //ConversationService.groupReportRequest(parseInt(groupId), reason, chatEvidence, picEvidence).then(function (result) {
            //    $state.go('tab.conversations.group-edit', {
            //        id: groupId
            //    });
            //});
            JSCommand.ccdp.reportGroup(groupId, reason, chatEvidence, picEvidence);
        }
        //当聊天记录和图片都为空的时候,就执行如下操作并提交数据
        if ($scope.picEvidence.length == 0 && $scope.groupReport.chatEvidence == "") {

            confirmPopup = $ionicPopup.confirm({
                template: '没有聊天记录会影响审核结果，是否继续提交？',
                buttons: [{
                    text: '取消',
                    type: 'button-default',
                    onTap: function () {
                        return false;
                    }
                }, {
                    text: '确定',
                    type: 'button-positive',
                    onTap: function () {
                        return true;
                    }
                }]
            });
            confirmPopup.then(function (res) {
                if (res) {
                    var groupId = $scope.groupReport.groupId;
                    var reason = $scope.groupReport.specificReasons;
                    var chatEvidence = $scope.groupReport.chatEvidence;
                    var picEvidence = $scope.picEvidence;

                    JSCommand.ccdp.reportGroup(groupId, reason, chatEvidence, picEvidence);
                    //ConversationService.groupReportRequest(parseInt(groupId), reason, chatEvidence, picEvidence).then(function (result) {
                    //    $state.go('tab.conversations.group-edit', {
                    //        id: groupId
                    //    });
                    //});
                } else {

                }
            });
        }
    };

    //$scope.$on(Constants.events.yhAppCallJs + Constants.APP_CMD.push.keyPressed, function (event, status, result) {
    //    //console.log('arguments',arguments)
    //    if(confirmPopup){
    //        confirmPopup.close();
    //    }
    //});


};
ContactReportEvidence.$inject = [
    '$scope',
    '$state',
    '$ionicModal',
    '$stateParams',
    '$ionicPopup',
    'JSCommand',
    'JSUtils',
    'JSCache',
    'Constants'
];

module.exports = ContactReportEvidence;