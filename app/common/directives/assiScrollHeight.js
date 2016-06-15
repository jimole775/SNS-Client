/**
 * Created by haicheng on 2016/1/27.
 */

var _ = require('underscore');

var assiScrollHeight = function ($ionicSlideBoxDelegate,$ionicScrollDelegate) {
    return {
        restrict: 'EA',
        link: link
    };
    function link(scope, elm, attr){
        var raw = elm[0];
        var _index=$ionicSlideBoxDelegate.$getByHandle('hand-viewer')._instances[0].currentIndex();
        elm.bind('scroll', function() {
            console.log(raw);
                if($ionicSlideBoxDelegate.$getByHandle('hand-viewer')._instances[0].currentIndex()!==_index){
                    $ionicScrollDelegate.scrollTop();
                }
        });
    }
};


assiScrollHeight.$inject = [
"$ionicSlideBoxDelegate",
    '$ionicScrollDelegate'
];

module.exports = assiScrollHeight;