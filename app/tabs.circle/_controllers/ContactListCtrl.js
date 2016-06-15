/**
 * Created by tapes on 2015/8/31.
 */

var ContactListCtrl = function ($scope,
                                $ionicModal,
                                Constants) {


    $scope.requestPopup = function () {
        if ($scope.requestModal) {
            $scope.requestModal.remove();
        }

        $scope.requestModal = $ionicModal.fromTemplate(require('../templates/ContactRequestToAssist.html'), {
            scope: $scope,
            animation: 'slide-in-up'
        });

        $scope.requestModal.show();

    };
    $scope.requestClick = function () {
        $scope.requestModal.hide();
        $scope.requestModal.remove();
    };


    $scope.requestingPopup = function () {
        if ($scope._menuModal_) {
            $scope._menuModal_.remove();
        }

        $scope._menuModal_ = $ionicModal.fromTemplate(require('../templates/ContactRequestingAssistance.html'), {
            scope: $scope,
            animation: 'slide-in-up'
        });

        $scope._menuModal_.show();

    };

    $scope.requestingClick = function () {
        $scope._menuModal_.hide();
    };


    $scope.$on(Constants.events.yhAppCallJs + Constants.APP_CMD.push.keyPressed, function (event, status, result) {
        //console.log('arguments',arguments)
        $scope.requestModal.hide();
        $scope._menuModal_.hide();
    });

    $scope.$on('$destroy', function () {
        $scope.requestModal.remove();
        $scope._menuModal_.remove();
    });
};
ContactListCtrl.$inject = [
    '$scope',
    '$ionicModal',
    'Constants'];

module.exports = ContactListCtrl;