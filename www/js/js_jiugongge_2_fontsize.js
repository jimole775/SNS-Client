/**
 * Created by userName on 2016/2/6.
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
$(function(){
    var index;
    $(".select-project").on("click","a",function(){
        index=$(".select-project a").index($(this));
        $('#showChoose').show();
    });
    $('.tipbox-content').on('click','a', function () {
        //var _index=$(".select-dia-type-block").index($(this).parent());
        $(".select-project").find("a").eq(index).find("span").html($(this).html());
        $('#showChoose').hide();

    })
});
