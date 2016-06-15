/**
 * Created by Weidongjian on 2015/12/17.
 */
var _ = require('underscore');

var vehicleInformation = function ($scope,
                                   $stateParams,
                                   vehicleInformation,
                                   JSCommand,
                                   JSUtils) {

    console.log('enter the vehicle information controller...');

    $scope.selectedInformationList = [];

    var valueObj = {};

    $scope.$on('YHJSReceiver', function (event, json) {
        try {
            var what = json.what;
            if (what === Constants.YHWhat.app.sendVehicleInformation) {

                var status = json.status;

                if (status === Constants.status.success) {
                    console.log('sendMessage onSuccess: ', json);
                } else {
                    console.log("Login fail:" + json["reason"])
                }
            }

        } catch (error) {

        }
    });

    $scope.brandList = JSUtils.rankingAccording(vehicleInformation.brand);

    if ($stateParams.targetId && $stateParams.conversationType) {

        $scope.targetId = parseInt($stateParams.targetId);

        $scope.conversationType = parseInt($stateParams.conversationType);

        valueObj.targetId = $scope.targetId;
        valueObj.conversationType = $scope.conversationType;
        //ConversationService.setReceivingParameters($scope.targetId, $scope.conversationType);

        return valueObj;
        //ConversationService.getReceivingParameters();

    }

    //选品牌时候的数据
    if ($stateParams.brandId) {


        $scope.brandId = parseInt($stateParams.brandId);

        $scope.CarsSeries = vehicleInformation.series;

    }

    //选择车系的时候的数据
    if ($stateParams.carsSeriesId) {

        $scope.brandId = $stateParams.brandId;

        $scope.carsSeriesId = $stateParams.carsSeriesId;

        $scope.yearTypeList = vehicleInformation.type;

    }

    //选择年款后的数据
    if ($stateParams.faultId) {

        $scope.vehicleInformationObj = {};
        _.forEach(vehicleInformation.brand, function (brandObj) {
            if (brandObj.selected) {
                $scope.vehicleInformationObj.brand = brandObj.name;
            }
        });

        _.forEach(vehicleInformation.series, function (seriesObj) {
            if (seriesObj.selected) {
                $scope.vehicleInformationObj.series = seriesObj.name;
            }
        });

        _.forEach(vehicleInformation.type, function (typeObj) {
            if (typeObj.selected) {
                $scope.vehicleInformationObj.type = typeObj.name;
            }

        });

        var receivingParameters = valueObj;


        $scope.selectedInformationList.push($scope.vehicleInformationObj);
        var selectedInformationListStr = JSON.stringify($scope.selectedInformationList);

        var content = selectedInformationListStr;
        var pushContent = '';
        var pushData = '';

        $scope.sendVehicleInformationMessage = function () {
            // vehicleInformationService.sendCarInfoMessage()
            JSCommand.app.sendCarInfoMessage(receivingParameters.conversationType, receivingParameters.targetId, content, pushContent, pushData);
        }

    }

};

vehicleInformation.$inject = [
    '$scope',
    '$stateParams',
    'vehicleInformation',
    'JSCommand',
    'JSUtils'
];

module.exports = vehicleInformation;