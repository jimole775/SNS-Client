/**
 * Created by Weidongjian on 2015/12/9.
 */
var personDataCtrl = function ($scope,
                               $state,
                               $stateParams,
                               $ionicModal,
                               JSUtils,
                               Constants,
                               JSCache,
                               JSCommand) {

    console.log('enter the person data controller...');

    $scope.$on('YHJSReceiver', function (event, json) {
        try {
            var what = json["what"];
            if (what == Constants.YHWhat.ccdp.CCDP_MODIFY_USERINFO) {
                // 回复
                var status = json["status"];
                if (status == Constants.status.success) {
                    // 成功修改调用用户详情
                    modifyNickNameModal.hide();
                    modifySexModal.hide();
                    if($scope.valueSex!=""){
                        $scope.personData.sex= $scope.valueSex;
                    }
                    if($scope.valueName != undefined){
                        $scope.personData.nickName=$scope.valueName;
                    }
                    JSCache.put(Constants.YHCache.personData,$scope.personData);
                    console.log("$scope.personData.sex",$scope.personData);
                }
                else {
                    // 失败
                    //取消头像上传
                    typeAvatarModal.hide();
                    alert("Get person home data fail:" + json["reason"]);
                }
            }
            else if (what == Constants.YHWhat.app.previewImage) {
                var status = json["status"];
                if (status == Constants.status.success) {
                    typeAvatarModal.hide();
                    $scope.$apply(function () {
                        $scope.personData.icon = json.data.icon;
                        $scope.currUserInfo.icon = $scope.personData.icon;
                    });
                    //修改头像成功,需要将登陆个人信息缓存做改变
                    JSCache.put(Constants.YHCache.personData,$scope.personData);
                    JSCache.put(Constants.YHCache.loginInfo,$scope.currUserInfo);
                }
                else {
                    alert("Get person home data fail:" + json["reason"]);
                }
            }
        }
        catch (error) {
            alert("error" + error);
        }
    });

    $scope.personData=JSCache.get(Constants.YHCache.personData);
    $scope.currUserInfo = JSCache.get(Constants.YHCache.loginInfo);

    console.log("$scope.personData",$scope.personData);
    sessionStorage.setItem("updataTime", $scope.personData != null ? $scope.personData.nickNameUpdateTime : "");

    $scope.Sexs = [
        {sex: "男"},
        {sex: "女"}
    ];


    // 修改弹框页
    var modifyNickNameModal = $ionicModal.fromTemplate(require('./modify-nick-name-modal.html'), {
        scope: $scope,
        animation: 'slide-right-left'
    });
    var modifySexModal = $ionicModal.fromTemplate(require('./modify-sex-modal.html'), {
        scope: $scope,
        animation: 'slide-right-left'
    });
    var typeAvatarModal = $ionicModal.fromTemplate(require('./modify-avatar-choose.html'), {
        scope: $scope,
        animation: 'slide-right-left'
    });

    /*修改头像，类型选择*/
    $scope.showTypeAvatarModal = function () {
        typeAvatarModal.show();
    };
    //修改头像写这里
    $scope.modifyPersonalAvatar = function () {
        var Rpc_Cmd = Constants.YHWhat.ccdp.CCDP_MODIFY_USERINFO;
        console.log('Rpc_Cmd', Rpc_Cmd);
        var userPic=-1;
        var key = 3;
        JSCommand.app.getPreviewImage(userPic,Rpc_Cmd, key);
    };




    //显示弹框页面
    $scope.showNickNameModal = function () {
        modifyNickNameModal.show();
    };
    $scope.showSexModal = function () {
        modifySexModal.show();
    };
    //隐藏弹框
    $scope.closeNickNameModal = function () {
        modifyNickNameModal.hide();
    };


    function isEmptyObject(Obj) {
        var flag = true;
        angular.forEach(Obj, function () {
            flag = false;
        });
        return flag;
    }

    //提交修改nickName
    $scope.submitModifyNickName = function (error) {

        $scope.flag = isEmptyObject(error);
        console.log("error~~~~~~~~",$scope.flag);
        if ($scope.flag) {
            var key = Constants.modifyTechnicianSetup.userNickname;
            $scope.valueName = $scope.personData.nickName;
            JSCommand.ccdp.modifyUser(key, $scope.valueName,"");
        }

    };

    //提交需改sex

    $scope.selectedSex = function (sex) {
        var key = Constants.modifyTechnicianSetup.userSex;
        $scope.valueSex = sex.toString();
        JSCommand.ccdp.modifyUser(key,  $scope.valueSex,"");
    };


    //关闭弹框页面
    $scope.closeModal = function () {
        modifyNickNameModal.hide();
        modifySexModal.hide();
        typeAvatarModal.hide();
    };


};

personDataCtrl.$inject = [
    '$scope',
    '$state',
    '$stateParams',
    '$ionicModal',
    'JSUtils',
    'Constants',
    'JSCache',
    'JSCommand'
];

module.exports = personDataCtrl;