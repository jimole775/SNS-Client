/**
 * Created by Andy on 2015/9/6.
 */
var UserDetailCtrl = function ($scope,
                               Constants,
                               JSCommand,
                               JSCache,
                               $state,
                               $stateParams,
                               $rootScope) {

    console.log('enter the user detail controller...');

    // first to get user detail
    var id = $stateParams.id;
    JSCommand.ccdp.queryUserDetail(id);

    // listen the message and process my interest
    $scope.$on('YHJSReceiver', function (event, jsonResult) {
        try {
            var what = jsonResult.what;
            var status = jsonResult.status;
            if (status == Constants.status.success) {

                var userDetail = jsonResult.data.user;
                if (what === Constants.YHWhat.ccdp.CCDP_QUERY_USERDETAILINFO) {
                    $scope.user = userDetail;
                }
                else if (what === Constants.YHWhat.ccdp.CCDP_ADD_FRIEND) {
                    $scope.user.relation = userDetail.relation;
                }
                else if (what === Constants.YHWhat.ccdp.CCDP_ACCEPT_FRIEND) {
                    $scope.user.relation = userDetail.relation;
                }
                else if (what === Constants.YHWhat.ccdp.CCDP_DELETE_FRIEND) {
                    $state.go('tab.circle.friends')
                }

            } else {

            }

        } catch (error) {
            console.log("process user detail message fail:", error);
        }
    });

    $scope.disabledNewFriend=false;
    $scope.addMyFriend = function (id) {
        JSCommand.ccdp.addFriend(id);
    };

    $scope.refuse = function (id) {
        $scope.disabledNewFriend=true;
        JSCommand.ccdp.deleteFriend(id);

        console.log("start to broadcast my new friend count");
        var countNewFriends= JSCache.get(Constants.YHCache.loginInfo);
        if(countNewFriends){
            countNewFriends.friendApplyCount--;
            JSCache.put(Constants.YHCache.loginInfo,countNewFriends);

            $rootScope.$broadcast("YHNewFriend", '');
        }
    };

    $scope.acceptFriend = function (id) {
        $scope.disabledNewFriend=true;
        JSCommand.ccdp.acceptFriend(id);

        var countNewFriends= JSCache.get(Constants.YHCache.loginInfo);
        if(countNewFriends){
            countNewFriends.friendApplyCount--;
            JSCache.put(Constants.YHCache.loginInfo,countNewFriends);

            $rootScope.$broadcast("YHNewFriend", '');
        }
    };

    $scope.deleteFriend = function (id) {
        JSCommand.ccdp.deleteFriend(id)
    }

};

UserDetailCtrl.$inject = [
    '$scope',
    'Constants',
    'JSCommand',
    'JSCache',
    '$state',
    '$stateParams',
    '$rootScope'
];

module.exports = UserDetailCtrl;