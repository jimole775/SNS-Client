/**
 * Created by userName on 2015/8/31.
 */
var exports = function ($scope,
                        JSCommand,
                        Constants) {

    console.log('enter the find friend controller...');

    $scope.allUserList='';
    $scope.filter = {
        "fuzzy": ""
    };
    $scope.userList = [];
    $scope.moreDataCanBeLoaded = true;

    $scope.$on('YHJSReceiver', function (event, jsonResult) {
        try {
            var what = jsonResult.what;
            //var userList =jsonResult.data.userList;
            if (what === Constants.YHWhat.ccdp.CCDP_QUERY_USERBYCONDITIONS) {
                var status = jsonResult.status;
                if (status === Constants.status.success) {

                    $scope.$apply(function () {
                        $scope.userList=jsonResult.data.userList;
                    });
                    console.log("$userList:::",jsonResult);


                }else{
                    console.log("Login fail:" + json["reason"]);
                    $scope.moreDataCanBeLoaded = false;
                }
            }

        } catch (error) {

        }
    });
   /* $scope.pageNum = 1;
    var pageSize = 10;*/
    $scope.$watch('filter.fuzzy', function () {
        $scope.pageNum = 0;
        $scope.moreDataCanBeLoaded = true;
        $scope.userList.length = 0;
        $scope.loadMoreData();
    });

    $scope.loadMoreData = function () {
        var filterString = JSON.stringify($scope.filter);
        JSCommand.ccdp.queryUserByCondition(-1, -1, filterString);
    };
};

exports.$inject = [
    '$scope',
    'JSCommand',
    'Constants'
];

module.exports = exports;