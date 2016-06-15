/* 
 * 日期插件
 * 滑动选取日期（年，月，日）
 * V1.1
 */
(function ($) {
    $.fn.setTime = function (pluginId) {
        //插件默认选项
        var that = $(this);
        var docType = $(this).is('input');
        var nowdate = new Date();
        var indexH = 1, indexI = 1, indexS = 0;
        var initH = parseInt(nowdate.getHours());
        var initI = parseInt(nowdate.getMinutes());
        var initS = parseInt(nowdate.getYear());
        var loopMinArr = [{

            begin: 00,
            end: 59

        }];
        var loopHourArr = [{

            begin: 00,
            end: 23

        }];

        var HourScroll = null, MinuteScroll = null, SecondScroll = null;



        createUL();      //动态生成控件显示的日期
        init_iScroll_datetime();
        extendOptions(); //显示控件
        refreshTime();
        that.blur();
        bindButton();




        function refreshTime() {
            HourScroll.refresh();
            MinuteScroll.refresh();
            //SecondScroll.refresh();
            refreshInit();
            HourScroll.scrollTo(0, initH * 40, 100, true);
            MinuteScroll.scrollTo(0, initI * 40, 100, true);
            //initH = parseInt(nowdate.getHours());
        }

        function refreshInit() {
          if (that.val() === "") {
                return false;
            }

            var getVal = that.val().toString();

            //匹配最后2个数，如果包含"-"就返回真，不包含就返回假；
            var arrVal = getVal.split(':');
            initH = arrVal[0];
            initI = arrVal[1];

        }

        function bindButton() {

            $("#dateconfirm").unbind('click').click(function () {

                var  datestr= $("#Hourwrapper ul li:eq(" + indexH + ")").html()+":"+$("#Minutewrapper ul li:eq(" + indexI + ")").html();

                    if (docType) {
                        that.val(datestr);
                    } else {
                        that.html(datestr);
                    }

                /*$("#datePage").hide();
                $("#dateshadow").hide();*/
                $("#"+pluginId).html('');
            });
            $("#datecancle").click(function () {
               /* $("#datePage").hide();
                $("#dateshadow").hide();*/
                $("#"+pluginId).html('');
            });
        }
        function resetStyle(args) {
            var $all = $("#" + args + " ul");
            var markEl = $all.find('li[class="mark"]');
            markEl.removeClass('mark').addClass('default');

        }
        //日期+时间滑动
        function init_iScroll_datetime() {
            HourScroll = new iScroll("Hourwrapper", {
                snap: "li", vScrollbar: false, checkDOMChanges: true,
                onBeforeScrollStart: function (e) {
                    e.preventDefault();
                },
                onScrollMove: function () {
                    resetStyle('Hourwrapper');

                },
                onScrollEnd: function () {
                    indexH = (this.y / 40) * (-1) + 1;
                    $("#Hourwrapper ul li:eq(" + indexH + ")").removeClass('default').addClass('mark');

                    if ($("#Hourwrapper ul li:eq(" + indexH + ")").attr('class') == 'default') {
                        $("#Hourwrapper ul li:eq(" + indexH + ")").removeClass('default').addClass('mark');
                    }

                    if ( $("#Hourwrapper ul li[class='markStyle']").length >= 2) {

                        $("#Hourwrapper ul li:eq(1)").removeClass('mark').addClass('default');
                    }
                    //HourScroll.refresh();

                }
            });
            MinuteScroll = new iScroll("Minutewrapper", {
                snap: "li", vScrollbar: false, checkDOMChanges: true,
                onBeforeScrollStart: function (e) {
                    e.preventDefault();
                },
                onScrollMove: function () {
                    resetStyle('Minutewrapper');

                },
                onScrollEnd: function () {
                    indexI = (this.y / 40) * (-1) + 1;
                    $("#Minutewrapper ul li:eq(" + indexI + ")").removeClass('default').addClass('mark');

                    if ($("#Minutewrapper ul li:eq(" + indexI + ")").attr('class') == 'default') {
                        $("#Minutewrapper ul li:eq(" + indexI + ")").removeClass('default').addClass('mark');
                    }

                    if ( $("#Minutewrapper ul li[class='markStyle']").length >= 2) {

                        $("#Minutewrapper ul li:eq(1)").removeClass('mark').addClass('default');
                    }
                    //HourScroll.refresh();
                }
            });
            /*SecondScroll = new iScroll("Secondwrapper", {
             snap: "li", vScrollbar: false,
             onScrollEnd: function () {
             indexS = Math.round((this.y / 40) * (-1));
             HourScroll.refresh();
             }
             })*/
        }

        function extendOptions() {
            $("#datePage").show();
            $("#dateshadow").show();
        }


        function createUL() {
            CreateDateUI();
            $("#Hourwrapper ul").html(createHOURS_UL());
            $("#Minutewrapper ul").html(createMINUTE_UL());
        }

        function CreateDateUI() {
            var str = '' +
                '<div id="dateshadow"></div>' +
                '<div id="datePage" class="page">' +
                '<section>' +
                '<span class="set-confirm-span">编辑时间</span>' +
                '<div id="timemark"><a id="markhour">时</a><a id="markminut">分</a></div>' +
                '<div id="datescroll_datetime">' +
                '<div id="Hourwrapper">' +
                '<ul></ul>' +
                '</div>' +
                '<div id="Minutewrapper">' +
                '<ul></ul>' +
                '</div>' +
                    /*'<div id="Secondwrapper">' +
                     '<ul></ul>' +
                     '</div>' +*/
                '</div>' +
                '</section>' +
                '<footer id="dateFooter">' +
                '<div class="button-bar">' +
                '<a id="dateconfirm" class="button helpChat-tipBox-button" href="#">确定</a>' +
                '<a id="datecancle"  class="button helpChat-tipBox-button" href="#">取消</a>' +
                '</div>' +
                '</footer>' +
                '</div>';
            $("#"+pluginId).html(str);

        }

        //创建 --时-- 列表
        function createHOURS_UL() {
            var str = "<li>&nbsp;</li>";
            for (var i = loopHourArr[0].begin; i <= loopHourArr[0].end; i++) {
                str += '<li>' + i + '</li>'
            }
            return str + "<li>&nbsp;</li>";

        }

        //创建 --分-- 列表
        function createMINUTE_UL() {
            var str = "<li>&nbsp;</li>";
            for (var i = loopMinArr[0].begin; i <= loopMinArr[0].end; i++) {
                if (i < 10) {
                    i = "0" + i
                }
                str += '<li>' + i + '</li>'
            }
            return str + "<li>&nbsp;</li>";

        }

        //创建 --分-- 列表
        /*   function createSECOND_UL() {
         var str = "<li>&nbsp;</li>";
         str += "<li>上午</li><li>下午</li>"
         return str + "<li>&nbsp;</li>";
         ;
         }*/
    }
})(jQuery);  
