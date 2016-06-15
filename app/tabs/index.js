/**
 * Created by tapes on 2015/10/30.
 */

module.exports = angular.module('app.tabs', [
    'ionic', 'ngCookies',
    require('../common').name])

    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state('tab', {
                url: "/tab",
                abstract: true,
                views: {
                    '': require('./main')
                }
            });

        // $urlRouterProvider.otherwise('/tab/circle/contact-list');

    }]);