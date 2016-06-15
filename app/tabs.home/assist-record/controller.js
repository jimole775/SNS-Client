/**
 * Created by Weidongjian on 2015/12/10.
 */

var assistRecordCtrl = function ($scope,
                                 $state,
                                 JSCache,
                                 $ionicSlideBoxDelegate,
                                 JSCommand,
                                 Constants,
                                 $timeout,
                                 $ionicScrollDelegate) {

    console.log('enter the assist record controller...');
    $scope.hasAssistToMeRecord = false;
    $scope.hasAssistFromMeRecord = false;
    $scope.$on('YHJSReceiver', function (event, json) {
        try {
            var what = json["what"];
            if (what === Constants.YHWhat.ccdp.CCDP_QUERY_ASSISTTOME) {
                var status = json["status"];
                if (status === Constants.status.success) {
                    $scope.$apply(function () {
                        $scope.assistList=json.data.assistList;
                        console.log("协助我的~~~", $scope.assistList);

                    });

                }else{
                    console.log("Login fail:" + json["reason"]);
                    $scope.moreDataCanBeLoaded = false;
                }
            }
             else if(what === Constants.YHWhat.ccdp.CCDP_QUERY_ASSISTMETO) {
                var status = json["status"];
                if (status === Constants.status.success) {
                    if(json.data.assistList.length<=0)
                        $scope.hasAssistFromMeRecord = true;
                    $scope.toAassistList=json.data.assistList;
                    console.log("我协助的~~~", $scope.toAassistList)
                }else{
                    console.log("Login fail:" + json["reason"]);
                }
            }

        } catch (error) {

        }
    });


    /*
        获取我协助列表
     */
    JSCommand.ccdp.queryAssistFromMe(1);



    $scope.helpMeSwitchNavigation = true;
    $scope.changePage = function (index){

        if(index === 0){
            $scope.helpMeSwitchNavigation = true;
            $scope.MyAssistanceSwitchNavigation = false;
        }
        if(index === 1){
            $scope.helpMeSwitchNavigation = false;
            $scope.MyAssistanceSwitchNavigation = true;
        }
    };

    //跳回上一页
    $scope.helpMeClick = function () {
        $ionicSlideBoxDelegate.previous();
    };

    //跳入下一页
    $scope.MyAssistanceClick = function (){
        $ionicSlideBoxDelegate.next();
    };
/****************************************
    华丽分割,测试
****************************************/

    $scope.userList = [];
    $scope.pageNum = 0;

    $scope.moreDataCanBeLoaded = true;

    $scope.loadMoreData = function () {
        $scope.pageNum += 1;
        console.log($scope.pageNum);
        JSCommand.ccdp.queryAssistToMe($scope.pageNum);
        $timeout(function(){
            if (!angular.isDefined($scope.assistList) || $scope.assistList.length === 0) {
                $scope.hasAssistToMeRecord = true;
                $scope.moreDataCanBeLoaded = false;
                return;
            } else {
                $scope.$broadcast('scroll.infiniteScrollComplete');
                $scope.userList = $scope.userList.concat($scope.assistList);
                $scope.hasAssistToMeRecord = false;
                $scope.moreDataCanBeLoaded = false;
            }
        },3000);

    };





};

assistRecordCtrl.$inject = [
    '$scope',
    '$state',
    'JSCache',
    '$ionicSlideBoxDelegate',
    'JSCommand',
    'Constants',
    '$timeout',
    '$ionicScrollDelegate'
];

module.exports = assistRecordCtrl;
