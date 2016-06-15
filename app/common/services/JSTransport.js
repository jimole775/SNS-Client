/**
 * Created by Administrator on 2016/1/6.
 */
var JSTransport = function ($rootScope) {

    return {
        send: function (message) {
            try {
                 window.YHJavascriptToApp.sendToApp(message);
                 console.log('发送指令为',message,"到App");
            }
            catch (error) {
                console.error(error);
            }
        },

        sendEx : function(map){
            try{
                var message = JSON.stringify(map);
                return this.send(message);
            }
            catch(error){
                console.error(error);
            }
        },

        receive : function(json){
            $rootScope.$broadcast('YHJSReceiver', json);
        }
    }

};

JSTransport.$inject = [
    '$rootScope'
];

module.exports = JSTransport;