/**
 * Created by Weidongjian on 2015/12/6.
 */
var searchResult = function ($scope,
                             JSCommand,
                             $stateParams,
                             Constants) {

    console.log('enter the search result controller...');

    // define the parameter to store the result
    $scope.searchResultData = [];

    //
    $scope.pageNum = -1;  //分頁
    $scope.pageSize = -1;

    JSCommand.ccdp.queryUserByCondition($scope.pageNum, $scope.pageSize, $stateParams.result);

    $scope.$on('YHJSReceiver', function (event, jsonResult) {

        try {
            var what = jsonResult.what;
            if (what === Constants.YHWhat.ccdp.CCDP_QUERY_USERBYCONDITIONS) {
                var status = jsonResult.status;
                if (status === Constants.status.success) {
                    if (jsonResult.data.userList.length === 0) {
                        return;
                    } else {
                        $scope.searchResultData = $scope.searchResultData.concat(jsonResult.data.userList);
                        $scope.userCount=$scope.searchResultData.length;

                        if ($scope.searchResultData.length != 0) {
                            $scope.filtrationCondition = {
                                filterBrandList: $scope.brandselectedIcon,
                                filterServiceList: $scope.serviceSelectedName,
                                grade: $scope.selectedPraisename
                            };
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                        }
                    }
                } else {
                    console.log("Login fail:" + json["reason"]);
                }
            }

        } catch (error) {

        }
    });

 /*   $scope.loadMoreData = function () {
        $scope.pageNum += 1;
        JSCommand.ccdp.queryUserByCondition($scope.pageNum, $scope.pageSize , $stateParams.result);
    };*/
};

searchResult.$inject = [
    '$scope',
    'JSCommand',
    '$stateParams',
    'Constants'
];

module.exports = searchResult;