/**
 * Created by Weidongjian on 2015/12/9.
 */
var realNameCtrl = function ($scope,
                             $state,
                             JSUtils,
                             JSCache,
                             JSCommand,
                             Constants) {

    console.log('enter the real name controller...');

    $scope.userData = {
        trueName: '',
        idNumber: ''
    };
    $scope.posiPhotoName="";
    $scope.reveSidePhotoName="";
    var picPath;

    $scope.$on('YHJSReceiver',function(event,json){
        try{
            var what = json["what"];
            if (what == Constants.YHWhat.ccdp.CCDP_ADD_USERAUTHENTICATION) {
                // 回复
                var status = json["status"];
                if (status == Constants.status.success) {
                    // 成功
                    console.log('是否成功:',json);
                    $state.go('tab.home.person-data');
                }
                else {
                    // 失败
                    alert("Get person home data fail:" + json["reason"]);
                }
            }
            else if (what == Constants.YHWhat.app.previewImage) {
                var status = json["status"];

                if (status == Constants.status.success) {
                    if(picPath){
                        $scope.$apply(function () {
                            $scope.posiPhotoName=json.data.imgName;
                        });
                    }
                    if(!picPath){
                        $scope.$apply(function () {
                            $scope.reveSidePhotoName=json.data.imgName;
                        });
                    }
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

    //this pictures for
    function getPicPath(){
        var Rpc_Cmd = Constants.YHWhat.ccdp.CCDP_UPLOAD_IMAGE;
        console.log('Rpc_Cmd', Rpc_Cmd);
        var userPic=-1;
        var key = -1;
        JSCommand.app.getPreviewImage(userPic,Rpc_Cmd, key);
    }
    $scope.positiveClick = function () {
        //获取图片
        picPath=true;
        getPicPath();
    };
    $scope.reverseSideClick = function () {
        //获取图片
        picPath=false;
        getPicPath();
    };
    $scope.submitResult = function () {
        var trueName=$scope.userData.trueName;
        var idNumber=$scope.userData.idNumber;
        var posiPhotoName=$scope.posiPhotoName;
        var reveSidePhotoName=$scope.reveSidePhotoName;
        JSCommand.ccdp.authenticationUser(trueName, idNumber, posiPhotoName, reveSidePhotoName);
    }


};

realNameCtrl.$inject = [
    '$scope',
    '$state',
    'JSUtils',
    'JSCache',
    'JSCommand',
    'Constants'

];

module.exports = realNameCtrl;