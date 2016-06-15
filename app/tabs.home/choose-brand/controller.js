/**
 * Created by Weidongjian on 2015/12/9.
 */
/**
 * Created by Weidongjian on 2015/8/7.
 *
 */
var _ = require('underscore');

var MoreExpertSettingChooseBrandCtrl = function ($scope,
                                                 $stateParams,
                                                 $state,
                                                 JSCommand,
                                                 Constants,
                                                 JSCache,
                                                 JSUtils) {
    console.log('enter the more expert setting choose brand controller...');

    var userId = $stateParams.userId;
    $scope.userId = userId;

    $scope.selectedBrandList = '';
    $scope.brandListCategoryInAlpha = '';
    $scope.$on('YHJSReceiver', function (event, json) {
        try {
            var what = json["what"];
            if (what == Constants.YHWhat.ccdp.CCDP_QUERY_FILTERLIST) {
                var status = json["status"];
                if (status == Constants.status.success) {
                    // 请求成功获取品牌数据
                    $scope.$apply(function () {
                        $scope.brandList = json.data.itemList;
                        $scope.brandListCategoryInAlpha = JSUtils.rankingAccording(JSON.parse(JSON.stringify($scope.brandList)));
                    });
                    //获取品牌设置信息后做处理
                    $scope.$watch('selectedBrandList', function () {
                        _.forEach($scope.brandListCategoryInAlpha, function (CategoryInAlpha) {
                            $scope.userList = CategoryInAlpha.userList;
                            _.forEach(CategoryInAlpha.userList, function (userListObj) {
                                var brand = _.findWhere($scope.selectedBrandList, {
                                    id: userListObj.id
                                });
                                if (brand) {
                                    userListObj.isChecked = true;
                                }
                                if (userListObj.isChecked) {
                                    $scope.saveSelectBrandArray.push(userListObj.id);
                                }
                            });
                            console.log("$scope.userList~~~", $scope.userList);
                        });

                    }, true);

                }
                else {
                    alert("Get person home data fail:" + json["reason"]);
                }
            }
            else if (what == Constants.YHWhat.ccdp.CCDP_MODIFY_USERINFO) {
                // 回复
                var status = json["status"];
                if (status == Constants.status.success) {
                    // 请求擅长处理成功
                    console.log("success-----:");
                    $state.go('tab.home.expert-setting', {userId: userId});
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
    $scope.selectedBrandList=JSCache.get(Constants.YHCache.brandListData);


    /*
        获取brand列表
     */
    JSCommand.ccdp.queryFilterList(Constants.filterType.brand);


    // 删除数组中元素 方法.
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

    $scope.saveSelectBrandArray = [];
    $scope.isSelectBrand = function (event, brandObj) {
        var isChecked = event.target.checked;
        if (isChecked) {
            $scope.saveSelectBrandArray.push(brandObj.id);
        }
        if (!isChecked) {
            $scope.saveSelectBrandArray.remove(brandObj.id)
        }
    };


    //确定修改技师选择品牌设置
    $scope.sureModifyBrand = function () {
        var Value = {
            serviceBrand: $scope.saveSelectBrandArray
        };
        var JsonStr = JSON.stringify(Value);
        var key = Constants.modifyTechnicianSetup.userServiceBrand;
        console.log("最后的数据:", JsonStr);
        JSCommand.ccdp.modifyUser(key, JsonStr, "");
    };

};

MoreExpertSettingChooseBrandCtrl.$inject = [
    '$scope',
    '$stateParams',
    '$state',
    'JSCommand',
    'Constants',
    'JSCache',
    'JSUtils'
];

module.exports = MoreExpertSettingChooseBrandCtrl;