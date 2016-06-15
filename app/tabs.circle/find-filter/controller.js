/**
 * Created by Andy on 2015/8/31.
 */
var _ = require('underscore');

var SearchFilterCtrl = function ($scope,
                                 JSCommand,
                                 $state,
                                 $ionicModal,
                                 Constants,
                                 JSUtils) {

    console.log('enter the search filter controller...');

    $scope.brandList='';
    $scope.serviceList='';
    $scope.onLineId = null;  //是否在線

    $scope.$on('YHJSReceiver', function (event,jsonResult) {
        try{
            var what = jsonResult.what;
            if(what === Constants.YHWhat.ccdp.CCDP_QUERY_FILTERLIST){
                var status = jsonResult.status;
                var type = jsonResult.data.type;

                console.log("jsonResult",jsonResult);
                if(status === Constants.status.success){
                   switch (type){
                       case 0:
                           $scope.$apply(function(){
                               $scope.brandList = jsonResult.data.itemList;
                           });
                           break;
                       case 1:
                           $scope.serviceList = jsonResult.data.itemList;
                           break;
                       case 2:
                           $scope.PraiseList = jsonResult.data.itemList;
                           break;

                   }
                }
            }
        }
        catch(error){

        }
    });

    //选择品牌
    JSCommand.ccdp.queryFilterList(Constants.filterType.brand);

    //专家好评等级
    JSCommand.ccdp.queryFilterList(Constants.filterType.expertLevel);

    //选择擅长处理
    var service;
    JSCommand.ccdp.queryFilterList(Constants.filterType.service);



    function isShowSelectIcon(Arr) {
        return _.some(Arr, function (item) {
            return item.isChecked;
        });
    }

    function isAllSelected(Arr) {
        return _.every(Arr, function (item) {
            console.log(Arr);
            return item.isChecked
        })
    }

    function isOnline(type) {
        switch (type) {
            case 0:
                $scope.isOnlineType = '不在线';
                break;
            case 1:
                $scope.isOnlineType = '在线';
        }

        return $scope.isOnlineType;
    }

    $scope.isShownotChoice = true;


    $scope.brandModal = $ionicModal.fromTemplate(require('./select-brand.html'), {
        scope: $scope,
        animation: 'slide-right-left'
    });

    $scope.serviceModal = $ionicModal.fromTemplate(require('./select-service.html'), {
        scope: $scope,
        animation: 'slide-right-left'
    });

    $scope.praiseModal = $ionicModal.fromTemplate(require('./select-praise.html'), {
        scope: $scope,
        animation: 'slide-right-left'
    });

    $scope.onLineModal = $ionicModal.fromTemplate(require('./select-online.html'), {
        scope: $scope,
        animation: 'slide-right-left'
    });

    $scope.sreachResultModal = $ionicModal.fromTemplate(require('./../search-result/select-result.html'), {
        scope: $scope,
        animation: 'slide-right-left'
    });
    //点击到好友详情后,隐藏筛选后的结果列表
    $scope.showFriendData = function () {
        $scope.sreachResultModal.hide();
    };


    var result;
    $scope.showBrandModal = function () {
        $scope.brandselected = [];
        $scope.brandselectedIcon = [];
        $scope.brandListCategoryInAlpha = JSUtils.rankingAccording(JSON.parse(JSON.stringify($scope.brandList)));

        $scope.brandModal.show();
        console.log('brandListCategoryInAlpha', $scope.brandListCategoryInAlpha);
        result = Array.prototype.concat.apply([], _.map($scope.brandListCategoryInAlpha, function (category) {
            return category.userList;
        }));

    };

    $scope.goBackSearchFilter = function () {
        $scope.brandModal.hide();
        $scope.serviceModal.hide();
        $scope.sreachResultModal.hide();
    };

    $scope.backTechnicianCircle = function () {
        $scope.sreachResultModal.hide();
        $scope.__goToViewAsTop('tab.circle.friends');
    };

    $scope.sureSelect = function () {
        //TODO: 保存数据;

        _.forEach($scope.brandListCategoryInAlpha, function (categoryInAlpha) {
            _.forEach(categoryInAlpha.userList, function (brandTmp) {
                var brand = _.findWhere($scope.brandList, {
                    id: brandTmp.id
                });

                if (brand) {
                    brand.isChecked = brandTmp.isChecked;
                }
                if (brand.isChecked) {
                    $scope.brandselected.push(brand.id);
                    $scope.brandselectedIcon.push({icon_ur: brand.icon_ur});
                }
                console.log("$scope.brandselected:",$scope.brandselected)
            })
        });
        $scope.brandModal.hide();
    };


    $scope.$watch('brandListCategoryInAlpha', function () {
        if (result != 'undefined')
        //$scope.limitedSelected = limitedSelect(result); //记录已经选好的 id

            $scope.flag.isAllSelectedFlag = isAllSelected(result);
    }, true);

    $scope.$watch('brandList', function () {
        $scope.isShowSelectIcon = isShowSelectIcon(result);
        if (!$scope.isShowSelectIcon) {
            $scope.isShowNotChoice = true;
        } else {
            $scope.isShowNotChoice = false;
        }
    }, true);

    $scope.flag = {
        isAllSelectedFlag: false,
        isAllSelectedServiceFlag: false
    };

    $scope.showServiceModal = function () {
        $scope.serviceSelected = [];
        $scope.serviceSelectedName = [];
        $scope.serviceModal.show();
        $scope.copyServiceList = JSON.parse(JSON.stringify($scope.serviceList));

        service = Array.prototype.concat.apply([], _.map($scope.copyServiceList, function (service) {
            return service;
        }));
    };

    $scope.$watch('copyServiceList', function () {

        //$scope.limitedSelected = limitedSelect(service); // 记录已经选好的id

        $scope.flag.isAllSelectedServiceFlag = isAllSelected(service)
    }, true);

    $scope.$watch('serviceList', function () {
        $scope.isShowSelectSerivce = isShowSelectIcon(service);
        if (!$scope.isShowSelectSerivce) {
            $scope.isShowNotChoiceService = true;
        } else {
            $scope.isShowNotChoiceService = false;
        }
    }, true);

    //擅长处理数据提交
    $scope.sureSelectService = function () {
        //TODO 保存选择服务数据
        _.forEach($scope.copyServiceList, function (serviceList) {
            var service = _.findWhere($scope.serviceList, {
                id: serviceList.id
            });
            if (service) {
                service.isChecked = serviceList.isChecked;
            }
            if (service.isChecked) {
                $scope.serviceSelected.push(service.id);
                $scope.serviceSelectedName.push(service.name);
            }
            console.log($scope.serviceSelectedName);
        });
        $scope.serviceModal.hide()
    };

    $scope.showPraiseModal = function () {
        $scope.praiseModal.show();
    };

    $scope.selectedPraise = function (id, name) {
        $scope.selectedPraiseId = id;
        $scope.selectedPraisename = name;
        console.log('selectedPraiseName', $scope.selectedPraisename);
        $scope.praiseModal.hide();
    };

    $scope.notSelectedPraise = function () {
        $scope.selectedPraiseId = null;
        $scope.selectedPraisename = '';
        $scope.praiseModal.hide();
    };


    //是否在线
    $scope.showOnlineModal = function () {
        $scope.onLineModal.show();
        $scope.onLineState = '在线';
        $scope.notOnLineState = '不在线';
    };

    $scope.isOnLine = function (id) {
        $scope.onLineId = id;
        $scope.onLineModal.hide();
        $scope.isOnLineState = isOnline(id);
    };

    $scope.searchResult = function () {
        var searchResultJsonObj =
        {
            "professionalBrandList": $scope.brandselected,
            "professionalProjectList": $scope.serviceSelected,
            "grade": $scope.selectedPraiseId,
            "isOnline": $scope.onLineId
        };
        var searchResultJsonString = JSON.stringify(searchResultJsonObj);
        $state.go('tab.circle.search-result', {result: searchResultJsonString});
    };

    $scope.$on('$destroy', function () {
        $scope.brandModal.remove();
        $scope.serviceModal.remove();
        $scope.sreachResultModal.remove();
    });

    /*$scope.$on(Constants.events.yhAppCallJs + Constants.APP_CMD.push.keyPressed, function (event, status, result) {
        //console.log('arguments',arguments)
        $scope.brandModal.remove();
        $scope.serviceModal.remove();
        $scope.sreachResultModal.remove();
        $scope.praiseModal.remove();
        $scope.onLineModal.remove();
    })*/
};

SearchFilterCtrl.$inject = [
    '$scope',
    'JSCommand',
    '$state',
    '$ionicModal',
    'Constants',
    'JSUtils'
];

module.exports = SearchFilterCtrl;