/**
 * Created by userName on 2016/3/23.
 */
$(function () {
    $("#gotoSetting").click(function(){
        console.log("进入设置！");
        var message = {};
        message['what'] = 0xB007;
        message['status'] = 0;
        var msg = JSON.stringify(message);
        window.YHJavascriptToApp.sendToApp(msg);
    });
});
$(function () {
    $("#isLink").click(function(){
        console.log("进入WiFi设置！");
        var message = {};
        message['what'] = 0xB008;
        message['status'] = 0;
        var msg = JSON.stringify(message);
        window.YHJavascriptToApp.sendToApp(msg);
    });
});

window.YHAndroidToJs = {
    sendToJS: function (message) {
        var json = JSON.parse(message);
        var what = json['what'];
        var status =json['status'];
        if(what == 0xB008){
            if(status==0){
                console.log("链接成功！");
                $("#isLink").find('i').eq(0).css({
                    display:'block'
                });
                $("#isLink").find('i').eq(1).css({
                    display:'none'
                });
            }else{
                console.log("链接失败！");
                $("#isLink").find('i').eq(1).css({
                    display:'block'
                });
                $("#isLink").find('i').eq(0).css({
                    display:'none'
                });
            }
        }
        console.log('接收到APP发来指令为', message);
    }
};