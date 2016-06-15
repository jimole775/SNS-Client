/**
 * Created by Administrator on 2016/4/6.
 */
//计算字体大小
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
			console.log("clientWidth=" + clientWidth);
            if (clientWidth >= 640) {
                docEl.style.fontSize = '50px';
            } else {
                docEl.style.fontSize = 40 * (clientWidth / 640) + 'px';
            }
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
$(function () {
        $('.content').hide();
        for (var i = 0; i < $(".diagnose .diagnose_list").length; i++) {
            if ($(".diagnose .diagnose_list").eq(i).find(".content").length == 0) {
                $(".diagnose .diagnose_list").eq(i).find(".contentShow_btn").remove();
            }
        }
        $(".diagnose_list .contentShow_btn").click(function (e) {
            e.preventDefault();
            var thisEle = $(this);
            var grandpa = thisEle.parents(".diagnose_list");
            grandpa.siblings().find(".content").slideUp();
            grandpa.siblings().find(".contentShow_btn").removeClass("iconUp");
            grandpa.find('.content').slideToggle(function () {
                if (grandpa.find('.content').is(":hidden")) {
                    thisEle.removeClass("iconUp");
                }
            });
            if (!grandpa.find('.content').is(":hidden")) {
                thisEle.addClass("iconUp");
            }
            $('html,body').animate({
                scrollTop: grandpa.offsetTop
            }, 500);
        });
    }
);
