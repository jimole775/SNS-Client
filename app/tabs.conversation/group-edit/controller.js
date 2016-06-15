/**
 * Created by Weidongjian on 2015/9/30.
 */

var _ = require('underscore');

var editGroupDetailCtrl = function ($scope,
                                    $state,
                                    JSCache,
                                    $ionicModal,
                                    $filter,
                                    JSCommand,
                                    JSUtils,
                                    Constants,
                                    $ionicPopup,
                                    $stateParams,
                                    $rootScope,
                                    $ionicTabsDelegate) {

    console.log('enter the conversation group edit controller...');

    var targetId = $stateParams.id;
    //var group = {};
    $scope.group = '';
    $scope.userListCategoryInAlpha='';
    $scope.friendList='';
    var typeagroupAvatarModal = $ionicModal.fromTemplate(require('./modify-groupAvatar-choose.html'), {
        scope: $scope,
        animation: 'slide-right-left'
    });
    $scope.$on('YHJSReceiver', function (event, json) {
        try {
            var what = json.what;
            if (what === Constants.YHWhat.ccdp.CCDP_QUERY_GROUPINFO) {

                var status = json.status;

                if (status === Constants.status.success) {
                    $scope.$apply(function () {
                        $scope.group = json.data.group;
                        //未改动群昵称时显示自己的昵称.
                        if ($scope.group.groupNickName === "") {
                            $scope.group.groupNickName = JSCache.get(Constants.YHCache.loginInfo).nickName;
                        }
                        console.log("$scope.group", $scope.group);
                    });

                } else {
                    console.log("Login fail:" + json["reason"])
                }
            }
            else if (what === Constants.YHWhat.ccdp.CCDP_QUERY_MYFRIEND) {
                var status = json.status;
                if (status === Constants.status.success) {
                    $scope.$apply(function () {
                        $scope.friendList = _.map(json.data.friendList, function (friend) {
                            var member = _.findWhere($scope.group.members, {
                                userId: friend.id
                            });

                            if (member) {
                                friend.isChecked = true;
                                friend.selected = 1;
                            }

                            return friend;
                        });
                    });

                } else {
                    console.log("Login fail:" + json["reason"])
                }
            }
            else if (what === Constants.YHWhat.ccdp.CCDP_UPDATE_GROUP) {
                var status = json.status;
                if (status === Constants.status.success) {
                    typeagroupAvatarModal.hide();
                    JSCommand.ccdp.queryMyFriends();
                    JSCommand.ccdp.queryGroupDetail(parseInt(targetId, 10));

                } else {
                    typeagroupAvatarModal.hide();
                    console.log("Login fail:" + json["reason"])
                }
            }
            else if (what == Constants.YHWhat.app.previewImage) {
                var status = json.status;
                if (status === Constants.status.success) {
                    console.log("群头像设置成功");
                    typeagroupAvatarModal.hide();

                } else {

                    console.log("Login fail:" + json["reason"])
                }
            }
            else if (what === Constants.YHWhat.ccdp.CCDP_QUITORDELETE_GROUP) {
                var status = json.status;
                if (status === Constants.status.success) {

                    $state.go('tab.conversations.conversation-list');

                } else {
                    console.log("Login fail:" + json["reason"])
                }
            }

        } catch (error) {

        }
    });

    JSCommand.ccdp.queryGroupDetail(parseInt(targetId, 10));
    // 获取选择好友列表
    JSCommand.ccdp.queryMyFriends();
    function getUserList(Arr) {
        var userListArr = [];
        var searchUser = $filter('searchUser')(Arr, $scope.SearchUser.nickName);
        $scope.userListCategoryInAlpha = JSUtils.rankingAccording(searchUser);
        _.forEach($scope.userListCategoryInAlpha, function (userItem) {
            _.forEach(userItem.userList, function (userObj, index) {
                userListArr.push(userObj)
            });
        });
        return userListArr;
    }

    $scope.goBackGroupList = function () {
        $scope.selectFriendModal.hide();
    };

    $scope.groupResult = {};
    $scope.SearchUser = {     //根据输入搜索
        nickName: ''
    };

    $scope.isShowRemoveFriend = false; //删除成员


    var userProfile = JSCache.get(Constants.YHCache.loginInfo);
    var id = userProfile.id;
    var groupId = JSCache.get(Constants.YHCache.groupInfo).id;//获取群id
    var advocateId = (JSCache.get(Constants.YHCache.groupInfo).advocateId).toString();//获取群主id




    $scope.selectFriendModal = $ionicModal.fromTemplate(require('./filterGroupFriend.html'), {
        scope: $scope,
        animation: 'slide-right-left'
    });

    //TODO 初始群设置信息
    if (advocateId == userProfile.id) {
        $scope.isShowMyIcon = true;
        $scope.isShowRemoveFriend = true;
        $scope.currentUser = userProfile;
    } else {
        $scope.isShowMyIcon = false;
    }


    $scope.$watch('SearchUser.nickName', function () {
        getUserList($scope.friendList);
    }, true);

    //添加按钮
    $scope.handleClickAddBtn = function () {
        $scope.userListCategoryInAlpha = JSUtils.rankingAccording($scope.friendList);
        $scope.selectFriendModal.show();
    };

    // 保存数据，新增群聊好友
    $scope.saveSelected = function () {
        _.forEach($scope.userListCategoryInAlpha, function (category) {
            _.forEach(category.userList, function (user) {

                if (user.isChecked && user.selected != 1) {
                    // 把新选中的 user 放进 群成员列表中
                    user.userId = user.id;
                    $scope.group.members.push(user);

                    var friend = _.findWhere($scope.friendList, {
                        userId: user.id
                    });

                    if (friend) {
                        friend.isChecked = true;
                        friend.selected = 1;
                    }
                }
            });
        });

        var userIdList = _.pluck($scope.group.members, "userId");
        var value = JSON.stringify(userIdList);

        $scope.selectFriendModal.hide();
        JSCommand.ccdp.updateGroup(groupId, 1, value, id);
    };


    /***阻止事件冒泡机制*******/
    $scope.stopEventBubble = function (event) {
        var e = event || window.event;

        if (e && e.stopPropagation) {
            e.stopPropagation();
        }
        else {
            e.cancelBubble = true;
        }
    };

    /**删除群成员***/
    $scope.removeFriend = function (evt, member) {
        $scope.stopEventBubble();

        // 需删除成员的索引
        var memberIndex = $scope.group.members.indexOf(member);
        // 删除该成员
        $scope.group.members.splice(memberIndex, 1);

        var value = member.userId;
        JSCommand.ccdp.updateGroup(groupId, 2, value, id);

        var friendToBeUnSelect = _.findWhere($scope.friendList, {
            id: member.id
        });

        // 若被删除的群成员是自己的好友, 从好友列表中反选被删除的成员
        if (friendToBeUnSelect) {
            friendToBeUnSelect.isChecked = false;
            friendToBeUnSelect.selected = 0;
        }

    };

    $scope.voiceShow = false;
    $scope.handleClickRemoveBtn = function (evt) {
        $scope.voiceShow = !$scope.voiceShow;
        $scope.isShowAddFriend = false;
        $scope.isShowRemoveFriend = false;
        $scope.stopEventBubble(evt);
    };
    $scope.hideDeleteBtn = function () {
        $scope.voiceShow = false;
    };

    //TODO  单击空白让增加删除回到最初状态
    $scope.handleClickBlankArea = function () {
        $scope.voiceShow = false;

        if (advocateId == id) {
            $scope.isShowAddFriend = true;//显示添加按钮
            $scope.isShowRemoveFriend = true;//显示删除按钮
        } else {
            $scope.isShowAddFriend = true;//显示添加按钮
            $scope.isShowRemoveFriend = false;//不显示删除按钮
        }
    };

//modify groupName
    var groupName = $ionicModal.fromTemplate(require('./create-group-name.html'), {
        scope: $scope,
        animation: 'slide-right-left'
    });

    $scope.createGroupName = function () {
        groupName.show();
    };

    $scope.closeModifyGroupName = function () {
        groupName.hide();
    };

    /***end***/

        //点击成员头像进入好友详情页面
    $scope.ViewsDetails = function (id) {
        if (!$scope.voiceShow) {
            console.log('id', id);
            $state.go('tab.conversations.user-detail', {id: id});
        }
    };
    //判断obj 是否为空
    function isEmptyObject(obj) {
        for (var key in obj) {
            return false;
        }
        return true;
    }

    $scope.groupModal = {
        name: '',
        groupNickNameL: ''
    };

    $scope.groupNameSubmit = function (error) {
        console.log(error);
        if (isEmptyObject(error)) {
            $scope.group.name = $scope.groupModal.name;
            JSCommand.ccdp.updateGroup(groupId, 4, $scope.group.name, id);
            groupName.hide();
        }
    };

    //群昵称修改开始----弹窗
    var groupNickName = $ionicModal.fromTemplate(require('./create-groupNickName.html'), {
        scope: $scope,
        animation: 'slide-right-left'
    });
    $scope.createGroupNickName = function () {
        groupNickName.show();
    };
    $scope.closeModifyNickName = function () {
        groupNickName.hide();
    };
    $scope.groupNickNameSubmit = function () {
        $scope.group.groupNickName = $scope.groupModal.groupNickName;
        JSCommand.ccdp.updateGroup(groupId, 5, $scope.group.groupNickName, id);
        groupNickName.hide();
    };

    //修改头像

   $scope.selectAvatar = function () {
        typeagroupAvatarModal.show();
    };
    $scope.modifyPersonalAvatar = function () {
        var Rpc_Cmd = Constants.YHWhat.ccdp.CCDP_UPDATE_GROUP;
        console.log('Rpc_Cmd', Rpc_Cmd);
        var groudId= targetId ;
        var key = 3;
        JSCommand.app.getPreviewImage(groudId,Rpc_Cmd, key);
    };
    $scope.closeModal = function () {
        typeagroupAvatarModal.hide();
    };

    /*******************************
     * 消息免打扰
     */

        //$scope.$watch('group.isNoDisturb', function () {
        //    group.isNoDisturb = JSUtils.transformBooleanToInt($scope.group.isNoDisturb);
        //}, true);
    $scope.modifyIsNoDisturb = function () {
        JSCommand.ccdp.updateGroup(groupId, 6, $scope.group.isNoDisturb, id);
    };

    /****
     * 否允许陌生人加群
     */
        //$scope.$watch('group.isAllowStrangerBoolean',function(){
        //    group.isAllowStranger = JSUtils.transformBooleanToInt(group.isAllowStrangerBoolean);
        //},true);
    $scope.modifyIsAllowStranger = function () {
        JSCommand.ccdp.updateGroup(groupId, 7, $scope.group.isAllowStranger, id);
    };

    /****
     * 否允许被搜索
     */
        //$scope.$watch('group.isAllowSearchBoolean',function(){
        //    group.isAllowSearch = JSUtils.transformBooleanToInt(group.isAllowSearchBoolean);
        //},true);
    $scope.modifyIsAllowSearch = function () {
        JSCommand.ccdp.updateGroup(groupId, 8, $scope.group.isAllowSearch, id);
    };


    //返回上一层按钮
    $scope.goBackGroup = function () {
        $scope.selectFriendModal.hide();

        $state.go('tab.messageConversation', {
            targetId: $stateParams.id,
            conversationType: 'GROUP'
        });

    };
    $scope.deleteSave = function () {

        var userId = id;

        //弹框提示似乎比较合理~~~~
        var confirmPopup = $ionicPopup.confirm({
            //title: 'Consume Ice Cream',
            template: '删除并退出后，将不再接收此群聊信息',
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
                JSCommand.ccdp.quit_deleteGroup(groupId);
            } else {
            }
        });
    };


    //$scope.$on(Constants.events.yhAppCallJs + Constants.APP_CMD.push.keyPressed, function (event, status, result) {
    //    //console.log('arguments',arguments)
    //    $scope.selectFriendModal.hide();
    //    groupNickName.hide();
    //    groupName.hide()
    //});

    $scope.$on('$destroy', function () {
        $scope.selectFriendModal.remove();
        groupNickName.remove();
        groupName.remove()
    });

};
editGroupDetailCtrl.$inject = [
    '$scope',
    '$state',
    'JSCache',
    '$ionicModal',
    '$filter',
    'JSCommand',
    'JSUtils',
    'Constants',
    '$ionicPopup',
    '$stateParams',
    '$rootScope',
    '$ionicTabsDelegate'
];
module.exports = editGroupDetailCtrl;