/**
 * Created by Weidongjian on 2015/12/9.
 */
var minuteDirective = function ($ionicScrollDelegate){
    return {
        restrict: 'A',

        link: function (scope, element, attrs, model) {
            scope.anchorScroll = function () {
                for (var i = 0; i < element[0].children[0].children.length; i++) {
                    element[0].children[0].children[i].style.color = "#000";
                }
                $ionicScrollDelegate.$getByHandle('minuteScroll');
                //Math.ceil($ionicScrollDelegate.$getByHandle('minuteScroll').getScrollPosition().top = 0);
                num = Math.round(Math.ceil($ionicScrollDelegate.$getByHandle('minuteScroll').getScrollPosition().top) / 50);
                double = Math.ceil($ionicScrollDelegate.$getByHandle('minuteScroll').getScrollPosition().top) / 50;
                var index;
                //$ionicScrollDelegate.$getByHandle('hourScroll').scrollTo(0, num * 50, false);
                if (double >= num - 0.5 && double < num + 0.5) {
                    element[0].children[0].style.transform = "translate3d(0px," + -num * 50 + "px,0px) scale(1)";
                }
                if (num < 0) {
                    index = 0;
                }
                else if (num > element[0].children[0].children.length - 3) {
                    index = element[0].children[0].children.length - 3;
                }
                else {
                    index = num;
                }
                element[0].children[0].children[index + 1].style.color = "#ff9c00";
                if (!sessionStorage.getItem('timeFlag')) {
                    sessionStorage.setItem('timeFlag', 0);
                }
                if (sessionStorage.getItem('timeFlag') == 0) {
                    sessionStorage.setItem('minuteFlag1', (Number(num) < 10 ? '0' + num : num));
                }
                else {
                    sessionStorage.setItem('minuteFlag2', (Number(num) < 10 ? '0' + num : num));
                }
            };
        }
    }
};

minuteDirective.$inject =[
    '$ionicScrollDelegate'
];

module.exports =minuteDirective;