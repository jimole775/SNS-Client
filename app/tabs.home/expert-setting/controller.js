/**
 * Created by Weidongjian on 2015/12/9.
 */
/**
 * Created by Weidongjian on 2015/8/7.
 */

var _ = require('underscore');

var ExpertSettingCtrl = function ($scope,
                                  $ionicModal,
                                  $stateParams,
                                  $state,
                                  $ionicScrollDelegate,
                                  JSUtils,
                                  Constants,
                                  JSCache,
                                  JSCommand) {

    console.log('enter the expert setting controller...');

    var userId = $stateParams.userId;
    $scope.userId = userId;
    $scope.brandList='';
    $scope.originalServeList='';
    console.log("$scope.userId",$scope.userId);
    $scope.$on('YHJSReceiver', function (event,json) {
        try{
            var what = json["what"];
            if(what == Constants.YHWhat.ccdp.CCDP_QUERY_USERDETAILINFO){
                var status = json["status"];
                if(status == Constants.status.success){
                    $scope.$apply(function(){
                        $scope.userSetDetail=json.data.user;
                        //获取页面显示数据
                        $scope.brandList=$scope.userSetDetail.brandList;
                        $scope.originalServeList=$scope.userSetDetail.serveList;
                        JSCache.put(Constants.YHCache.brandListData,$scope.brandList);
                        JSCache.put(Constants.YHCache.ServeListData,$scope.originalServeList);
                    });

                    console.log("brandList:",json.data.user)
                }
                else{
                    alert("Get person home data fail:" + json["reason"]);
                }
            }
            else if (what == Constants.YHWhat.ccdp.CCDP_MODIFY_USERINFO) {
                var status = json["status"];
                if (status == Constants.status.success) {
                    IntroductionModal.hide();
                    $state.go('tab.home.expert-setting', {userId: userId});
                }
                else {
                    alert("Get person home data fail:" + json["reason"]);
                }
            }

        }
        catch(error){
            alert("error" + error);
        }
    });

    JSCommand.ccdp.queryUserDetail(-1);

   var IntroductionModal = $ionicModal.fromTemplate(require('./introduction-modal.html'), {
        scope: $scope,
        animation: 'slide-right-left'
    });
    $scope.setTime = $ionicModal.fromTemplate(require('./set-time-confirm-modal.html'), {
        scope: $scope,
        animation: 'slide-right-left'
    });




    /*弹窗，服务介绍*/
    $scope.showIntroductionModal = function () {
        IntroductionModal.show();
    };

    $scope.Solutions = {
        text: ''
    };

    $scope.ServiceIntroduction = function () {
        IntroductionModal.hide();
        var key = Constants.modifyTechnicianSetup.userRemark;
        var value=$scope.Solutions.text;
        JSCommand.ccdp.modifyUser(key, value);
        $scope.userSetDetail.description = $scope.Solutions.text;
    };
    $scope.goBackSeting = function () {
        IntroductionModal.hide();
    };

    //时间设计:
    $scope.setConfirm = function () {
        if(angular.isDefined($scope.userSetDetail)){
            var str1 = $scope.userSetDetail.serveStartTime;
            var str2 = $scope.userSetDetail.serveEndTime;
            sessionStorage.setItem('hourFlag1', str1[0] + str1[1]);
            sessionStorage.setItem('minuteFlag1', str1[3] + str1[4]);
            sessionStorage.setItem('hourFlag2', str2[0] + str2[1]);
            sessionStorage.setItem('minuteFlag2', str2[3] + str2[4]);
            sessionStorage.setItem('timeFlag', 0);
        }

        $scope.setTime.show();
    };

    $scope.timeCancel = function () {
        sessionStorage.removeItem('timeFlag');
        $scope.setTime.hide();
    };

    $scope.timeConfirm = function () {
        console.log(sessionStorage);
        if (Number(sessionStorage.getItem('hourFlag1')) > Number(sessionStorage.getItem('hourFlag2'))) {
            return false;
        }
        if ((Number(sessionStorage.getItem('hourFlag1')) === Number(sessionStorage.getItem('hourFlag2'))) && (Number(sessionStorage.getItem('minuteFlag1')) > Number(sessionStorage.getItem('minuteFlag2')))) {
            return false;
        }
        var serveStartTime = sessionStorage.getItem('hourFlag1') + ":" + sessionStorage.getItem('minuteFlag1');
        var serveEndTime = sessionStorage.getItem('hourFlag2') + ":" + sessionStorage.getItem('minuteFlag2');
        $scope.Value = {
            "serveStartTime": serveStartTime,
            "serveEndTime": serveEndTime
        };

        var JsonValue = JSON.stringify($scope.Value);
        var key = Constants.modifyTechnicianSetup.userServiceTime;
        console.log("时间:",JsonValue);
        JSCommand.ccdp.modifyUser(key, JsonValue);
        $scope.userSetDetail.serveStartTime = $scope.Value.serveStartTime;
        $scope.userSetDetail.serveEndTime = $scope.Value.serveEndTime;
        sessionStorage.removeItem('timeFlag');
        $scope.setTime.hide();
    };




};

ExpertSettingCtrl.$inject = [
    '$scope',
    '$ionicModal',
    '$stateParams',
    '$state',
    '$ionicScrollDelegate',
    'JSUtils',
    'Constants',
    'JSCache',
    'JSCommand'
];

module.exports = ExpertSettingCtrl;