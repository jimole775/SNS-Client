/**
 * Created by tapes on 2015/10/30.
 */

var adjustBottomBy = function ($ionicScrollDelegate) {

    return {
        restrict: 'EA',
        scope   : false,
        link    : link
    };

    function link(scope, element, attrs) {
        var el    = element[0];
        var major = el.querySelector('[data-perspect="major"]');
        var minor = el.querySelector('[data-perspect="minor"]');

        scope.$watch(attrs.adjustBottomBy, function () {

            setTimeout(function () {
                console.log('adjustBottomBy');

                var height = major.clientHeight;

                angular.element(minor).css('bottom', height + 'px');

                $ionicScrollDelegate.scrollBottom();
            }, 100);

        });

        console.log('major: ', major);
        console.log('minor: ', minor);
    }
};

adjustBottomBy.$inject = [
    '$ionicScrollDelegate'
];

module.exports = adjustBottomBy;

