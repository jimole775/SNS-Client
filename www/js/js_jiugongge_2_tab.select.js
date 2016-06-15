/**
 * Created by Administrator on 2016/2/14.
 */

 $(function () {
    $(".box-tab li").on("click","a",function(){
        var _index=$(".box-tab li").index($(this).parents("li"));
        $(this).parents("li").addClass("on").siblings("li").removeClass("on");
        $(".index-list").eq(_index).fadeIn().show().siblings(".index-list").hide();
    });
    var len=$(".box-tab li").length;
    $(".box-tab li").width((100/len)+'%');
});


$(function () {
    $(".main").on("swipeleft", function (e) {
        var index = $(".box-tab").find("li").index($(".box-tab").find("li.on"));
        var _index;
        if (index == $(".box-tab").find("li").length - 1) {
            _index = $(".box-tab").find("li").length - 1;
        }
        else {
            _index = index + 1;
        }
        $(".box-tab").find("li").eq(_index).find("a").trigger("click");
    });
    $(".main").on("swiperight", function (e) {
        var index = $(".box-tab").find("li").index($(".box-tab").find("li.on"));
        var _index;
        if (index == 0) {
            _index = 0;
        }
        else {
            _index = index - 1;
        }
        $(".box-tab").find("li").eq(_index).find("a").trigger("click");
    });
    $('.main').on('movestart', function (e) {
        // If the movestart is heading off in an upwards or downwards
        // direction, prevent it so that the browser scrolls normally.
        if ((e.distX > e.distY && e.distX < -e.distY) ||
            (e.distX < e.distY && e.distX > -e.distY)) {
            e.preventDefault();
        }
    });
    var top = 0;
    setTimeout(function(){
        $('.main').css('top',$('.top').outerHeight()+'px');
    },30);
});
