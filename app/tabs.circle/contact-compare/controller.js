/**
 * Created by tapes on 2015/9/9.
 */

var _ = require('underscore');
var ContactCompareCtrl = function ($scope,
                                   $ionicListDelegate,
                                   Constants,
                                   JSCache,
                                   JSCommand,
                                   $filter,
                                   JSUtils
                                   ) {

    console.log('enter the contact compare controller...');

    var me = JSCache.get(Constants.YHCache.isLogin);

    $scope.userList='';
    $scope.search = {
        myCellPhoneFriend: ''
    };

    $scope.$on('YHJSReceiver', function (event, jsonResult) {
        try {
            var what = jsonResult.what;
            if (what === Constants.YHWhat.ccdp.CCDP_QUERY_CONTACTSFRIEND) {
                var status = jsonResult.status;
                if (status === Constants.status.success) {
                    $scope.userList = jsonResult.data.friendList;
                    var myCell=$scope.search.myCellPhoneFriend;
                    var friendList = $filter('searchUser')($scope.userList, myCell);
                    $scope.alphabeticalList = JSUtils.rankingAccording(friendList);
                    console.log("$scope.userList", $scope.userList);
                    console.log("userList", friendList);
                    console.log("$scope.alphabeticalList", $scope.alphabeticalList);
                }
            }
            else if (what === Constants.YHWhat.ccdp.CCDP_ADD_FRIEND) {
                var status = jsonResult.status;
                if (status === Constants.status.success) {
                    _.forEach($scope.alphabeticalList, function (alphabeticalItem) {
                        _.forEach(alphabeticalItem.userList,function(user){
                            if(user.id === jsonResult.user.id){
                                user.relation = jsonResult.user.relation;
                                user.initiator = jsonResult.user.initiator;
                            }
                        })
                    });
                } else {

                }
            }
        } catch (error) {

        }
    });

    $scope.$watch('search.myCellPhoneFriend', function (newValue, oldValue) {
        if(angular.isDefined($scope.search.myCellPhoneFriend)) {
            JSCommand.ccdp.queryContactsFriends();

            /*var userList = $filter('searchUser')($scope.userList, newValue);
            $scope.alphabeticalList = JSUtils.rankingAccording(userList);
            console.log("$scope.alphabeticalList", $scope.alphabeticalList);*/
        }
    });

    $scope.hasNoRelation = function (user) {
        return _.isUndefined(user.relation);
    };

    $scope.isApplied = function (user) {
        return user.relation === Constants.relation.applied && user.initiator === me.id;
    };

    $scope.isAccepted = function (user) {
        return user.relation === Constants.relation.accepted;
    };

    $scope.isRemoved = function (user) {
        return user.relation === Constants.relation.removed;
    };

    $scope.applyFriend = function ($event, user) {
        $event.preventDefault();
        $event.stopPropagation();
        JSCommand.ccdp.addFriend(user.id);
    };

    //$scope.inviteFriend = function ($event, user) {
    //    $event.preventDefault();
    //    $event.stopPropagation();
    //
    //    JSCommand.ccdp.inviteFriend(user.id);
    //
    //};
    /* $scope.removeApplyFriend = function ($event, user) {
     $event.preventDefault();
     $event.stopPropagation();

     JSCommand.removeApplyFriend(user.id).then(function (result) {
     $ionicListDelegate.closeOptionButtons();

     user.relation = result.user.relation;
     user.initiator = result.user.initiator;
     });
     };*/

    // 再次发起加为好友申请
    /* $scope.reApplyFriend = function ($event, user) {
     $scope.applyFriend($event, user).then(function () {
     $ionicListDelegate.closeOptionButtons();
     });
     };*/
};

ContactCompareCtrl.$inject = [
    '$scope',
    '$ionicListDelegate',
    'Constants',
    'JSCache',
    'JSCommand',
    '$filter',
    'JSUtils'
];

module.exports = ContactCompareCtrl;