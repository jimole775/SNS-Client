/**
 * Created by Cheng on 2015/9/10.
 */

var _ = require('underscore');

var ContactSetGroupCtrl = function ($scope,
                                    $state,
                                    $stateParams,
                                    $ionicModal,
                                    JSCache,
                                    $filter,
                                    $ionicPopup,
                                    JSCommand,
                                    Constants,
                                    JSUtils) {

    console.log('enter the contact set group controller...');

    $scope.$on('YHJSReceiver', function (event, jsonResult) {
        try {
            var what = jsonResult.what;
            if (what === Constants.YHWhat.ccdp.CCDP_QUERY_MYFRIEND) {
                var status = jsonResult.status;
                if (status === Constants.status.success) {

                    $scope.userResult = jsonResult.data.friendList;
                    getUserList($scope.userResult);

                } else {
                    console.log("Login fail:" + jsonResult["reason"])
                }
            }
            else if(what === Constants.YHWhat.ccdp.CCDP_ADD_GROUP){
                var status = jsonResult.status;

                if (status === Constants.status.success) {

                    $state.go('tab.conversations.conversation.GROUP', {
                        targetId: jsonResult.data.id,
                        conversationType: 'GROUP'
                    });

                } else {
                    console.log("Login fail:" + jsonResult["reason"])
                }
            }

        } catch (error) {

        }
    });

    /*
        在建群的时候，首先获取好友列表
     */
    JSCommand.ccdp.queryMyFriends();

    //获取当前用户信息
    var isLoginUser = JSCache.get(Constants.YHCache.loginInfo);
    console.log("user:",isLoginUser);
    $scope.isShowAddFriend = true;
    $scope.voiceShow = false;

    var flag = false;
    var id = isLoginUser.id;
    $scope.currentUser = isLoginUser;

    function getUserList(Arr) {
        var userListArr = [];
        var searchUser = $filter('searchUser')(Arr, $scope.SearchUser.nickName);
        $scope.userListCategoryInAlpha = JSUtils.rankingAccording(searchUser);

        _.forEach($scope.userListCategoryInAlpha, function (userItem) {
            _.forEach(userItem.userList, function (userObj, index) {
                userListArr.push(userObj)
            })
        });
        return userListArr;
    }

//********************************************

    /****允许陌生人加入群*****/
    $scope.isStrangerJoinClickBoolean = false;
    $scope.isCanBeSearchClickBoolean = false;
    $scope.$watch('isStrangerJoinClickBoolean', function () {
        if ($scope.isStrangerJoinClickBoolean) {
            $scope.group.isAllowStranger = 0;
        } else {
            $scope.group.isAllowStranger = 1;
        }
    });
    $scope.$watch('isCanBeSearchClickBoolean', function () {
        if ($scope.isCanBeSearchClickBoolean) {
            $scope.group.isAllowSearch = 0;
        } else {
            $scope.group.isAllowSearch = 1;
        }
    });


    $scope.isStrangerJoin = function () {

        $scope.isStrangerJoinClickBoolean = !$scope.isStrangerJoinClickBoolean;

    };
    $scope.isCanBeSearch = function () {

        $scope.isCanBeSearchClickBoolean = !$scope.isCanBeSearchClickBoolean;

    };
    /****允许陌生人加入群结束*****/


    $scope.group = {
        icon: "engineer-Zhao.png",
        isAllowStranger: 1,
        isAllowSearch: 1,
        name: ""
    };
    $scope.$watch('group', function () {
        console.log('group: ', $scope.group);
    }, true);

    $scope.goBackGroupList = function () {

        $scope.userList = _.uniq($scope.saveSelectUser);
        if ($scope.userList.length == 0) {
            $state.go('tab.circle.groups');
            $scope.newGroupModal.hide();
        } else {
            $scope.newGroupModal.hide();
        }
    };
    /*弹窗，选择好友方法*/
    $scope.newGroupModal = $ionicModal.fromTemplate(require('./filterGroupFriend.html'), {
        scope: $scope,
        animation: 'slide-right-left'
    });
    function showGroupModal() {
        $scope.newGroupModal.show();
    }

    showGroupModal();


    $scope.saveSelectUser = [];

    //激活确定按钮
    $scope.activateSave = function () {
        var activateSaveArry = [];
        var endActiArry = [];
        _.forEach($scope.userListCategoryInAlpha, function (categoryInAlpha) {
            _.forEach(categoryInAlpha.userList, function (user) {
                if (user.isChecked) {
                    activateSaveArry.push(user);
                }
                $scope.actiUserList = _.uniq(activateSaveArry);
            });
        });
        _.forEach($scope.actiUserList, function (actiUser) {
            //console.log("activateSaveArry:",actiUser );
            if (actiUser.isChecked) {
                endActiArry.push(actiUser);
            }
        });
        if (endActiArry.length == 0) {
            return true
        }
    };

    //TODO 保存已选的数据
    $scope.saveSelected = function () {
        $scope.newGroupModal.hide();
        _.forEach($scope.userListCategoryInAlpha, function (categoryInAlpha) {
            _.forEach(categoryInAlpha.userList, function (user) {
                if (user.isChecked) {
                    user['selected'] = 1;
                    $scope.saveSelectUser.push(user);
                }
                $scope.userList = _.uniq($scope.saveSelectUser);
                //console.log(user);
                if ($scope.userList.length > 0) {
                    $scope.isShowRemoveFriend = true;
                }
            });
        });

        $scope.group.userIdList = _.compact(_.map($scope.userList, function (user) {
            if (user.isChecked) {
                return user.id;
            }
        }))
    };


    $scope.ViewsDetails = function (id) {
        if (!$scope.voiceShow) {
            $state.go('tab.circle.user-detail', {id: id})
        }
    };

    $scope.SearchUser = {
        nickName: ''
    };

    //TODO 监听输入框的变化进行搜索
    $scope.$watch('SearchUser.nickName', function () {
        if (!flag) {
            var userListArr = getUserList($scope.userResult);
            $scope.userListArr = userListArr.length;
            flag = true;
        } else {
            var userListArr = getUserList($scope.userResult);
            $scope.userListArr = userListArr.length;
        }

    }, true);


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

    $scope.voiceShow = false;

    $scope.removeFriendState = function (evt) {
        $scope.voiceShow = !$scope.voiceShow;
        $scope.isShowAddFriend = false;
        $scope.isShowRemoveFriend = false;
        $scope.stopEventBubble(evt);
    };


    $scope.hideDeleteBtn = function () {
        $scope.voiceShow = false;
    };

    /****继续添加*****/
    $scope.addFriend = function (evt) {
        showGroupModal();
        $scope.stopEventBubble(evt);
    };
    /**删除群成员***/
    $scope.removeFriend = function (evt, item) {
        item.isChecked = false;
        $scope.stopEventBubble(evt);
        item.selected = 0;
        $scope.$watch('userList', function () {
            $scope.eventEvery = _.every($scope.userList, function (userItem) {
                return !userItem.isChecked;
            });
            if ($scope.eventEvery) {
                $scope.isShowAddFriend = true;
                $scope.isShowRemoveFriend = false;
            }
            //console.log($scope.eventEvery);
        });
    };
    //TODO  单击空白让增加删除回到最初状态

    $scope.isShowInitial = function () {
        $scope.voiceShow = false;
        if ($scope.eventEvery) {
            $scope.isShowAddFriend = true;//显示添加按钮
            $scope.isShowRemoveFriend = false;//不显示删除按钮
        } else {
            $scope.isShowAddFriend = true;//显示添加按钮
            $scope.isShowRemoveFriend = true;//显示删除按钮
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

    //判断obj 是否为空
    function isEmptyObject(obj) {
        for (var key in obj) {
            return false;
        }
        return true;
    }

    $scope.groupModal = {
        name: ''
    };

    $scope.groupNameSubmit = function (error) {
        console.log(error);
        if (isEmptyObject(error)) {
            $scope.group.name = $scope.groupModal.name;
            //console.log('$scope.group.name',$scope.group.name);
            groupName.hide();
        }
    };


    //弹窗
    var alertPopup;
    $scope.save = function () {
        var group = $scope.group;


        if (!group.name) {
            console.log("请输入群名称:");
            alertPopup = $ionicPopup.alert({
                template: '请输入群名称',
                buttons: [{
                    text: '确定',
                    type: 'button-positive',
                    onTap: function () {
                        return true;
                    }
                }]
            });
            alertPopup.then(function (res) {
                console.log("res:", res);
            });
        } else {
            JSCommand.ccdp.addGroup(group);
        }
    };

    /*$scope.$on(Constants.events.yhAppCallJs + Constants.APP_CMD.push.keyPressed, function (event, status, result) {
        //console.log('arguments',arguments)
        $scope.newGroupModal.remove();
        groupName.hide();
        if (alertPopup) {
            alertPopup.close();
        }
    });*/

    $scope.$on('$destroy', function () {
        $scope.newGroupModal.remove();
        groupName.hide();
    });
};

ContactSetGroupCtrl.$inject = [
    '$scope',
    '$state',
    '$stateParams',
    '$ionicModal',
    'JSCache',
    '$filter',
    '$ionicPopup',
    'JSCommand',
    'Constants',
    'JSUtils'
];

module.exports = ContactSetGroupCtrl;
