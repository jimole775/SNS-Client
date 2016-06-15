/**
 * Created by Andy on 2016/4/5.
 */
window.YHJavascriptToApp = {};

YHJavascriptToApp.sendToApp  = function(message){
    var josn = JSON.parse(message);
    if(josn["what"] && josn["what"] === 10747905){
        var json = JSON.stringify({
            what:0x00A40001,
            title:"whatEver",
            total:0,
            status:0x00
        });
        window.YHAndroidToJs.sendToJS(json);
    }
};