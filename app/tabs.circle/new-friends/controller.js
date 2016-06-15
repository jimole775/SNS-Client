/**
 * Created by userName on 2015/9/1.
 */

var _ = require('underscore');

var ContactNewFriendsCtrl = function ($scope,
                                      Constants,
                                      JSCache,
                                      $filter,
                                      JSCommand,
                                      $ionicModal) {

    console.log('enter the contact new friends controller...');

    //提示框
    var showAddPromptModal = $ionicModal.fromTemplate(require('./add-operation-prompt.html'), {
        scope: $scope,
        animation: 'slide-right-left'
    });
    var showPromptModal = $ionicModal.fromTemplate(require('./del-operation-prompt.html'), {
        scope: $scope,
        animation: 'slide-right-left'
    });
    var showRefusedPromptModal = $ionicModal.fromTemplate(require('./refused-operation-prompt.html'), {
        scope: $scope,
        animation: 'slide-right-left'
    });
    $scope.searchNewFriend = {
        "friend": ''
    };
    $scope.showTheMessage=false;
    $scope.$on('YHJSReceiver', function (event, jsonResult) {
        try {
            var what = jsonResult.what;
            if (what === Constants.YHWhat.ccdp.CCDP_QUERY_FRIENDRELATION) {
                var status = jsonResult.status;
                if (status === Constants.status.success) {
                    var friendList = jsonResult.data.friendList;
                    var condition = $scope.searchNewFriend.friend;
                    $scope.userList = $filter('searchUser')(friendList, condition);
                    console.log('$scope.userList~~~~~~',$scope.userList);
                } else {
                    $scope.showTheMessage=true;
                }
            }

            else if (what === Constants.YHWhat.ccdp.CCDP_ACCEPT_FRIEND) {
                var status = jsonResult.status;
                if (status === Constants.status.success) {
                    showAddPromptModal.hide();
                    $scope.queryRelation();
                   /* //拿到缓存个人信息推送过来的好友总数做处理
                    var countNewFirends= JSCache.get(Constants.YHCache.loginInfo);
                    countNewFirends.friendApplyCount--;
                    JSCache.put(Constants.YHCache.loginInfo,countNewFirends);*/
                } else {

                }
            }
            else if (what === Constants.YHWhat.ccdp.CCDP_DELETE_FRIEND) {
                var status = jsonResult.status;
                if (status === Constants.status.success) {
                    $scope.queryRelation();
                    showPromptModal.hide();
                    showRefusedPromptModal.hide();
                   /* //拿到缓存个人信息推送过来的好友总数做处理
                    var countNewFirends= JSCache.get(Constants.YHCache.loginInfo);
                    countNewFirends.friendApplyCount--;
                    JSCache.put(Constants.YHCache.loginInfo,countNewFirends);*/
                } else {

                }
            }
        } catch (error) {

        }
    });




    // $scope.userList = FriendRelationManager.getUserList();
    //搜索查询
    $scope.$watch('searchNewFriend.friend', function (newValue, oldValue) {
        if(angular.isDefined($scope.searchNewFriend.friend)){
            $scope.queryRelation();
        }

    });

    $scope.queryRelation = function(){
        // 发送重新获取好友关系列表
        JSCommand.ccdp.queryFriendRelation();

    };



    $scope.showAddPrompt= function ($event, user) {
        $scope.curremtName=user.nickName;
        $scope.curremId=user.id;
        showAddPromptModal.show();
    };
    $scope.showPrompt= function ($event, user) {
        $scope.curremtName=user.nickName;
        $scope.curremId=user.id;
        showPromptModal.show();

    };
    $scope.showRefusedPrompt= function ($event, user) {
        $scope.curremtName=user.nickName;
        $scope.curremId=user.id;
        showRefusedPromptModal.show();
    };
    $scope.closePromptModal= function () {
        showPromptModal.hide();
        showRefusedPromptModal.hide();
        showAddPromptModal.hide();
    };

    $scope.acceptFriend = function ($event, userId) {
        $event.preventDefault();
        $event.stopPropagation();

        JSCommand.ccdp.acceptFriend(userId);

    };
    $scope.removeApplyFriend = function (userId) {
        JSCommand.ccdp.deleteFriend(userId)
    };

};

ContactNewFriendsCtrl.$inject = [
    '$scope',
    'Constants',
    'JSCache',
    '$filter',
    'JSCommand',
    '$ionicModal'
];

module.exports = ContactNewFriendsCtrl;