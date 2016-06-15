/**
 * Created by haicheng on 2015/11/24.
 */

var _ = require('underscore');

var ContactToReport = function ($scope,
                                $state,
                                $ionicModal,
                                $stateParams,
                                JSCommand,
                                JSUtils,
                                JSCache,
                                Constants) {

    console.log('enter the contact to report controller...');

    //获取数据
    $scope.groupReport = {
        groupId: "",
        specificReasons: ""
    };

    $scope.$on('YHJSReceiver', function (event, json) {
        try {
            var what = json.what;
            if (what === Constants.YHWhat.ccdp.CCDP_QUERY_REPORTREASON) {
                var status = json.status;
                if (status === Constants.status.success) {
                    console.log(json.data.reportReason);
                    $scope.reportReason = json.data.reportReason;

                } else {
                    console.log("Login fail:" + json["reason"])
                }
            }

        } catch (error) {

        }
    });

    $scope.groupReport.groupId = $stateParams.targetId;
    console.log($stateParams.targetId);
    //ConversationService.groupReportData().then(function (result) {
    //    $scope.reportReason = result.reportReason;
    //});

    JSCommand.ccdp.queryReportReason();


    $scope.otherReportModule = $ionicModal.fromTemplate(require('./otherReport.html'), {
        scope: $scope,
        animation: 'slide-right-left'
    });

    $scope.serverSideChange = function (item) {
        $scope.groupReport.specificReasons = item.reportReason;
        JSCache.put("reportReason", item.reason);
        var reportReasonId = item.id;
        if (reportReasonId == 6) {
            $scope.otherReportModule.show();
        }
    };

    $scope.closeOtherReportModule = function () {
        $scope.otherReportModule.hide();
    };

    //其他原因输入框判断
    function isEmptyObject(obj) {
        for (var key in obj) {
            return false;
        }
        return true;
    }

    $scope.groupReportSubmit = function (error) {
        console.log(error);
        if (isEmptyObject(error)) {
            $scope.otherReportModule.hide();
        }
    };

    $scope.$watch('groupReport', function () {
        var reason = $scope.groupReport.specificReasons;
    }, true);

    //判断是否获取到原因,然后激活下一步按钮
    $scope.beReportNext = function () {
        return ($scope.groupReport.specificReasons !== "");
    };

    $scope.NextGroupEvidence = function () {
        $state.go('tab.conversations.group-report-evidence', {
            targetId: $scope.groupReport.groupId
        });
        $scope.closeOtherReportModule();
    };

    //$scope.$on(Constants.events.yhAppCallJs + Constants.APP_CMD.push.keyPressed, function (event, status, result) {
    //    //console.log('arguments',arguments)
    //    $scope.otherReportModule.hide();
    //});

    $scope.$on('$destroy', function () {
        $scope.otherReportModule.remove();
    });

};
ContactToReport.$inject = [
    '$scope',
    '$state',
    '$ionicModal',
    '$stateParams',
    'JSCommand',
    'JSUtils',
    'JSCache',
    'Constants'
];

module.exports = ContactToReport;