/**
 * Created by Weidongjian on 2015/12/9.
 */
var checkNickName =  function (){
    return {
        require: 'ngModel',
        scope: {
            someProperty: '@'
        },
        link: function (scope, element, attrs, ngModel) {
            var flag;
            var time=sessionStorage.getItem("updataTime");
            flagNickNameTiemStamp(time);
            ngModel.$parsers.push(function (value) {
                var isError = flagNickNameTiemStamp(time);
                if (isError > 0) {
                    ngModel.$setValidity('nickNameTime', true);
                    return value;
                } else if (isError < 0) {
                    ngModel.$setValidity('nickNameTime', false);
                    return value;
                }
            });
            function flagNickNameTiemStamp(timeUp) {
                    var nickNameTime = new Date(timeUp.replace(/-/g, '/').substring(0, 19));
                    nickNameTime.setHours(24);
                    nickNameTime.setUTCMinutes(0);
                    nickNameTime.setSeconds(0);
                    var nowTime = new Date();
                    var updateZeroTime = new Date(nickNameTime);
                    var nowTimeStamp = nowTime.getTime();
                    var updateZeroTimeStamp = updateZeroTime.getTime();
                    if (nowTime > updateZeroTime) {
                        flag = 1;
                    } else {
                        flag = -1;
                    }
                return flag
            }
        }
    };
};

checkNickName.$inject = [

];

module.exports = checkNickName;