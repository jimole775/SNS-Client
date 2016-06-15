/**
 * Created by Weidongjian on 2015/12/5.
 */
var searchFriends = function ($ionicGesture,Constants) {
    return {
        restrict: 'EA',
        scope: false,
        link: link
    };

    function link(scope, element, attrs) {
        scope.searchFriend = function () {

        };

        scope.moveSearchFriend = function () {

        }
    }
};

searchFriends.$inject = [
    '$ionicGesture',
    'constants'
];

module.exports = searchFriends;