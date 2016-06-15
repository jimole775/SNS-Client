/**
 * Created by Andy on 2015/9/6.
 */
var UserDetailCtrl = function ($scope,
                               $stateParams,
                               Constants,
                               JSCommand,
                               $state,
                               JSCache) {

    console.log('enter the user detail controller...');
    var id = $stateParams.id;
    $scope.$on('YHJSReceiver', function (event, jsonResult) {
        try {
            var what = jsonResult.what;
            var status = jsonResult.status;
            if (status == Constants.status.success) {

                if (what === Constants.YHWhat.ccdp.CCDP_QUERY_USERDETAILINFO) {
                    $scope.$apply(function () {
                        $scope.user = jsonResult.data.user;
                    });

                }
                else if (what === Constants.YHWhat.ccdp.CCDP_ADD_FRIEND) {
                    $scope.user.relation = jsonResult.user.relation;
                }
                else if (what === Constants.YHWhat.ccdp.CCDP_DELETE_FRIEND) {
                    $scope.user.relation = jsonResult.user.relation;
                }
                else if (what === Constants.YHWhat.ccdp.CCDP_ACCEPT_FRIEND) {
                    $scope.user.relation = jsonResult.user.relation;
                }
                else if (what === Constants.YHWhat.ccdp.CCDP_DELETE_FRIEND) {
                    $state.go('tab.circle.friends')
                }

            } else {

            }

        } catch (error) {

        }
    });

    console.log(id);


    $scope.disabledNewFriend=false;
    JSCommand.ccdp.queryUserDetail(id);

    $scope.addMyFriend = function (id) {
        $scope.disabledNewFriend=true;
        var countNewFirends= JSCache.get(Constants.YHCache.loginInfo);
        countNewFirends.friendApplyCount--;
        JSCache.put(Constants.YHCache.loginInfo,countNewFirends);
        console.log("countNewFirends:",countNewFirends);
        JSCommand.ccdp.addFriend(id);
    };

    $scope.refuse = function (id) {
        JSCommand.ccdp.deleteFriend(id);
    };

    $scope.acceptFriend = function (id) {

        JSCommand.ccdp.acceptFriend(id);

    };

    $scope.deleteFriend = function (id) {
        JSCommand.ccdp.deleteFriend(id)
    }

};

UserDetailCtrl.$inject = [
    '$scope',
    '$stateParams',
    'Constants',
    'JSCommand',
    '$state',
    'JSCache'
];

module.exports = UserDetailCtrl;