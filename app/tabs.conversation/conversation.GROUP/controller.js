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
                             JSCache,
                             JSCommand) {

    console.log('enter the conversation group controller...');

    var targetId = $stateParams.targetId;

    $scope.targetId = targetId;
    $scope.group="";

    $scope.conversationType = Constants.rongCloud.ConversationType.GROUP;

    $scope.$on('YHJSReceiver', function (event, jsonResult) {

        try {

            var status = jsonResult.status;
            if (status === Constants.status.success) {

                var what = jsonResult.what;

                if (what === Constants.YHWhat.ccdp.CCDP_QUERY_GROUPINFO) {

                    $scope.group = jsonResult.data.group;
                    JSCache.put(Constants.YHCache.groupInfo, jsonResult.data.group);
                }
            } else {
                console.log("Login fail:" + jsonResult["reason"])
            }


        } catch (error) {

        }

    });

    JSCommand.ccdp.queryGroupDetail(parseInt(targetId, 10));
    $scope.major = JSCache.get(Constants.YHCache.loginInfo);
    console.log("$scope.major",$scope.major);

    $scope.findGroupMemberById = function (id) {
        id = parseInt(id, 10);

        return _.findWhere($scope.group.members, {
            userId: id
        });
    };


};

Conversation.$inject = [
    '$scope',
    '$stateParams',
    '$ionicHistory',
    '$ionicScrollDelegate',
    '$ionicModal',
    'Constants',
    'JSCache',
    'JSCommand'
];

module.exports = Conversation;