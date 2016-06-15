/**
 * Created by Weidongjian on 2015/8/3.
 */
module.exports=function($scope,$ionicModal,JSCommand,$stateParams,JSCache){

    function isEmptyObject(obj) {
        for(var key in obj) {
            return false;
        }
        return true;
    }
    var userProfile = JSCache.getProfile();
    var userId = userProfile.get('id');
    console.log(userId);
    $scope.isShowFormError=false;
    $scope.active={
        name:'',
        address:'',
        mobilePhone:'',
        companyName:'',
        qicq:''
    };

    $scope.sigupForm = function(isValid){
        $scope.isShowFormError = true;
        console.log(isValid);
        if(isEmptyObject(isValid)) {
            var alias = $scope.active.name;
            var address = $scope.active.address;
            var mobilePhone = $scope.active.mobilePhone;
            var companyName = $scope.active.companyName;
            var qicq = $scope.active.qicq;
            var equipmentId = $stateParams.equipmentId;
            console.log(equipmentId);
            console.log(alias);
            JSCommand.getActiveResult(userId,equipmentId,alias,address,mobilePhone,companyName,qicq,function(status,result){
                console.log(result)
            });
        }
    }
};