/**
 * Created by userName on 2015/8/31.
 */

var _ = require('underscore');

var ContactFriendListCtrl = function ($scope,
                                      $state,
                                      JSUtils,
                                      JSCommand,
                                      $filter,
                                      $rootScope,
                                      Constants,
                                      JSCache) {

    console.log('enter the contact friend list controller...');

    $scope.form = {
        condition: ''
    };
    $scope.showTheMessage=false;
    $scope.$on('YHJSReceiver', function (event, json) {
        try {
            var what = json["what"];
            if (what == Constants.YHWhat.ccdp.CCDP_QUERY_MYFRIEND) {
                var status = json["status"];
                if (status == Constants.status.success) {

                    console.log("获取好友列表成功.");

                    $scope.$apply(function(){
                        var friendList = json.data.friendList;
                        var condition = $scope.form.condition;
                        var searchUserList = $filter('searchUser')(friendList, condition);
                        $scope.userList = JSUtils.rankingAccording(searchUserList);
                    });
                    $scope.userListCount = [];
                    _.forEach($scope.userList, function (allUserList) {
                        _.forEach(allUserList, function (userList) {
                            _.forEach(userList, function (user) {
                                if (user.id != undefined) {
                                    $scope.userListCount.push(user);
                                }
                            });
                        });

                    });
                    console.log("$scope.userListCount",$scope.userListCount.length);
                }
                else {
                    console.log("获取好友列表失败：" + json["reason"] );
                    $scope.showTheMessage=true;
                }
            }
        }
        catch (error) {
            alert("error" + error);
        }
    });
    $scope.newFirends=JSCache.get(Constants.YHCache.loginInfo);
    console.log("请求好友总数~~",$scope.newFirends);

    $scope.viewNewFriendClick= function () {
        $state.go('tab.circle.new-friends');
        $scope.newFirends.friendApplyCount=0;
        JSCache.put(Constants.YHCache.loginInfo);
    };


    $scope.$watch('form.condition', function (condition) {
        if(angular.isDefined($scope.form.condition)){
            JSCommand.ccdp.queryMyFriends();
        }
    });
};

ContactFriendListCtrl.$inject = [
    '$scope',
    '$state',
    'JSUtils',
    'JSCommand',
    '$filter',
    '$rootScope',
    'Constants',
    'JSCache'
];

module.exports = ContactFriendListCtrl;
