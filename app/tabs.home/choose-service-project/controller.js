/**
 * Created by Weidongjian on 2015/12/9.
 */

var _ = require('underscore');

var HomeChooseServiceProjectCtrl = function ($scope,
                                             $stateParams,
                                             $state,
                                             JSCommand,
                                             Constants,
                                             JSCache,
                                             JSUtils) {

    console.log('enter the home choose service project controller...');

    var userId = $stateParams.userId;
    $scope.userId = userId;
    $scope.selectedServiceList='';
    $scope.serviceCategoryInAlpha='';
    $scope.$on('YHJSReceiver', function (event,json) {
        try{
            var what = json["what"];
            if (what == Constants.YHWhat.ccdp.CCDP_QUERY_FILTERLIST) {
                // 回复
                var status = json["status"];
                if (status == Constants.status.success) {
                    // 请求成功获取服务数据
                    $scope.$apply(function () {
                        $scope.serviceCategoryInAlpha=json.data.itemList;
                    });
                    $scope.$watch('selectedServiceList', function () {
                        //$scope.saveSelectServiceArray = []; //记录已经选取的品牌id
                        _.forEach($scope.serviceCategoryInAlpha, function (serviceList) {

                            var service = _.findWhere($scope.selectedServiceList, {
                                id: serviceList.id
                            });
                            if (service) {
                                serviceList.isChecked = true;
                            }
                            if (serviceList.isChecked) {
                                $scope.saveSelectServiceArray.push(serviceList.id)
                            }
                        });

                    }, true);
                }
                else {
                    alert("Get person home data fail:" + json["reason"]);
                }
            }
            else if (what == Constants.YHWhat.ccdp.CCDP_MODIFY_USERINFO) {
                var status = json["status"];
                if (status == Constants.status.success) {
                    console.log("success-----:");
                    $state.go('tab.home.expert-setting',{userId: userId});
                }
                else {
                    alert("Get person home data fail:" + json["reason"]);
                }
            }
            //监听选过,已选


        }
        catch(error){
            alert("error" + error);
        }
    });
    $scope.selectedServiceList= JSCache.get(Constants.YHCache.ServeListData);


    JSCommand.ccdp.queryFilterList(Constants.filterType.service);

    Array.prototype.indexOf = function (value) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == value) return i;
        }
        return -1;
    };

    Array.prototype.remove = function (value) {
        var index = this.indexOf(value);
        if (index > -1) {
            this.splice(index, 1);
        }
    };
    // 多选

    $scope.saveSelectServiceArray = []; //记录已经选取的品牌id

    $scope.isSelectService = function (event, serviceObj) {

        var isChecked = event.target.checked;
        var serviceObjId = serviceObj.id;

        if (isChecked) {
            $scope.saveSelectServiceArray.push(serviceObj.id);
        }
        if (!isChecked) {
            $scope.saveSelectServiceArray.remove(serviceObj.id);
        }
    };

    $scope.sureModifyService = function () {
        var Value = {
            serviceProject: $scope.saveSelectServiceArray
        };

        var JsonStr = JSON.stringify(Value);
        var key = Constants.modifyTechnicianSetup.userServiceProject;
        console.log("最后的数据:",JsonStr);
        JSCommand.ccdp.modifyUser(key, JsonStr,"");
    };
};

HomeChooseServiceProjectCtrl.$inject = [
    '$scope',
    '$stateParams',
    '$state',
    'JSCommand',
    'Constants',
    'JSCache',
    'JSUtils'
];

module.exports = HomeChooseServiceProjectCtrl;