/**
 * Created by Weidongjian on 2015/12/9.
 */
var MyHomePageCtrl = function ($scope,
                               $state,
                               $rootScope,
                               $ionicLoading,
                               $ionicPopup,
                               JSUtils,
                               Constants,
                               JSCache,
                               JSCommand,
                               $ionicTabsDelegate) {

    console.log("enter the home page controller...");

    $scope.$on('YHJSReceiver', function (event, json) {
        try {
            var what = json["what"];
            if (what == Constants.YHWhat.ccdp.CCDP_QUERY_USERINFO) {
                var status = json["status"];
                if (status == Constants.status.success) {

                    $scope.$apply(function () {
                        $scope.userDetail = json.data;
                        JSCache.put(Constants.YHCache.personData,json.data);
                    })

                }
                else {
                    alert("Get person home data fail:" + json["reason"]);
                }
            }
            else if (what == Constants.YHWhat.ccdp.CCDP_LOGOUT) {
                var status = json["status"];
                console.log("用户登出.");
            }
            else if (what === Constants.YHWhat.app.CCDPBusinessSystemSetting) {}
        }
        catch (error) {
            alert("error" + error);
        }
    });

    var getUserDetail = function () {
        JSCommand.ccdp.queryUser();

        //// 模拟数据回复
        //var message = {};
        //message["what"] = Constants.YHWhat.ccdp.CCDP_PUSH_REQASSIST;
        //// message["what"] = Constants.YHWhat.ccdp.CCDP_REQ_ASSIST;
        //message["status"] = Constants.status.success;
        //message["data"] = '{"msgs":[{"id":0,"value":[{"id":114,"icon":"1456455960271.png","sex":1,"nickName":"111记性不大好","userName":"13737725203"}],"type":1,"msg":"请求远程协助的人"}]}';
        //var sMessage = JSON.stringify(message);
        //window.YHAndroidToJs.sendToJS(sMessage);
    };

    getUserDetail();

    //设置
    $scope.goToSetting = function () {
        console.log("进入设置~");
        JSCommand.app.getCCDPBusinessSystemSetting();
    };

    $scope.exitSign = function () {

        //弹框提示似乎比较合理~~~~
        var confirmPopup = $ionicPopup.confirm({
            //title: 'Consume Ice Cream',
            template: '是否确定退出？',
            buttons: [{
                text: '取消',
                type: 'button-default',
                onTap: function () {
                    return false;
                }
            }, {
                text: '确定',
                type: 'button-positive',
                onTap: function () {
                    return true;
                }
            }]
        });
        confirmPopup.then(function (res) {
            if (res) {

                $ionicLoading.show({
                    template: '正在退出...'
                });
                JSCommand.ccdp.logout();

                // 在发送完退出指令之后，这里直接退出用户登录状态
                $ionicLoading.hide();
                JSCache.remove(Constants.YHCache.loginInfo);
                $ionicTabsDelegate.$getByHandle('my-handle').select(0);

            } else {
                console.log('你取消了退出');
            }
        });
    }
};

MyHomePageCtrl.$inject = [
    '$scope',
    '$state',
    '$rootScope',
    '$ionicLoading',
    '$ionicPopup',
    'JSUtils',
    'Constants',
    'JSCache',
    'JSCommand',
    '$ionicTabsDelegate'
];

module.exports = MyHomePageCtrl;