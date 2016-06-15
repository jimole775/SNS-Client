/**
 * Created by userName on 2015/9/14.
 */
var ContactGroupList = function ($scope,
                                 $state,
                                 JSUtils,
                                 JSCommand,
                                 Constants) {

    console.log('enter the contact group controller...');

    $scope.$on('YHJSReceiver', function (event, jsonResult) {

        try{
            console.log('jsonResult.data.groupList',jsonResult.data.groupList);
            var what = jsonResult.what;

            if (what === Constants.YHWhat.ccdp.CCDP_QUERY_GROUP) {

                var status = jsonResult.status;

                if (status === Constants.status.success) {
                    $scope.$apply(function(){
                        $scope.groupList = jsonResult.data.groupList;
                    });
                }else{
                    console.log("Login fail:" + jsonResult["reason"])
                }
            }


        }catch(error){

        }

    });

    /*
       发起获取群列表的命令
     */
    JSCommand.ccdp.queryGroupList();

};

ContactGroupList.$inject = [
    '$scope',
    '$state',
    'JSUtils',
    'JSCommand',
    'Constants'
];

module.exports = ContactGroupList;