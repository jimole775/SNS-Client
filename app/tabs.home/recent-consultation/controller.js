/**
 * Created by Weidongjian on 2015/12/10.
 */
var ConsultationCtrl = function ($scope,
                                 $stateParams,
                                 $state){

    console.log('enter the recent-consultation controller...');

    var userId =$stateParams.userId;
    console.log(userId);
    var pageNum =1;
    getRecentConsultationData(pageNum);
    function getRecentConsultationData(pageNum){

    }

    $scope.chat =function(state,userId,username){
        if(state===0) {
            $state.go('tab.assistance-chat',{ minorId: userId, minorUsername: username });
        }
    };

    $scope.deleteConsultation =function(){

    }
};

ConsultationCtrl.$inject =[
    '$scope',
    '$stateParams',
    '$state'
];

module.exports = ConsultationCtrl;