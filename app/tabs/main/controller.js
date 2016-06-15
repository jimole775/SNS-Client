/**
 * Created by tapes on 2015/10/30.
 */

var _ = require('underscore');

var Main = function ($scope,
                     $rootScope,
                     $state,
                     $timeout,
                     $ionicModal,
                     $interval,
                     $ionicTabsDelegate,
                     $cookies,
                     $ionicNavBarDelegate,
                     $ionicHistory,
                     $ionicPopup,
                     FriendRelationManager,
                     Constants,
                     JSCache,
                     JSCommand,
                     JSUtils) {

    console.log("enter the login page...");

    // global parameters
    var user_name = JSCache.get(Constants.YHCache.userName);
    $scope.user = {
        username: user_name ? user_name : '',
        captcha: '',
        acceptLicense: true
    };

    // 是否后台登录
    $scope.loginbackground = true;
    // 记录跳转页面-to
    $scope.toState;
    // 记录跳转页面参数-to
    $scope.toParams;
    // 记录跳转页面-from
    $scope.fromState;
    // 记录跳转页面参数-from
    $scope.fromParams;
    // 正在登录提示框
    $scope.isLoading = false;

    // 监听android iOS发送过来的消息
    $scope.$on('YHJSReceiver', function (event, json) {
        try {
            var what = json["what"];
            if (what == Constants.YHWhat.ccdp.CCDP_LOGIN) {

                // 登录的回复
                var status = json["status"];
                console.log("登录状态:",status);
                if (status == Constants.status.success) {

                    console.log("登录成功！");

                    // 登录成功
                    $scope.isLoading = false;
                    $scope.user.captcha = "";
                    JSCache.put(Constants.YHCache.loginInfo, json.data);

                    // 关闭登录对话框
                    $scope.modalLogin.hide().then(function(){
                        if ($scope.toState && $scope.toParams) {
                            $state.go($scope.toState.name, $scope.toParams);
                        }
                    });
                    // 保存用户名
                    JSCache.put(Constants.YHCache.userName, $scope.user.username);
                }
                else {
                    /*
                     登录失败
                     */
                    console.log("登录失败:" + json["reason"]);
                    $scope.modalLogin.hide();
                    // 如果是后台登录，在接收到登录失败后，需要弹出这个对话框给用户
                    if($scope.loginbackground){
                        $rootScope.showTabs = true;
                        $scope.modalLogin.show();
                        $scope.loginbackground = false;
                    }
                    else{
                        // 清除用户信息
                        JSCache.remove(Constants.YHCache.loginInfo);
                        // 关闭用户正在登录提示框
                        $scope.isLoading = false;
                        // 验证码为空
                        $scope.user.captcha = "";
                        // 用户名获得焦点

                        // 提示用户登录失败
                        var m = 3;
                        $scope.LoginFailedPrompt=true;
                        $scope.promptTime = $interval(function () {
                            m--;
                            if (m <= 0) {
                                $interval.cancel($scope.promptTime);
                                $scope.LoginFailedPrompt=false;
                            }
                        }, 1000);
                    }
                }
            }
            if(what == Constants.YHWhat.app.network.down){
                console.log("网络已经断开");
            }
            else if (what == Constants.YHWhat.ccdp.CCDP_SEND_CAPTCHA) {
                // 获取验证码的回复
                var status = json["status"];
                if (status == Constants.status.success) {
                    // 成功
                    console.log("获取验证码成功!");
                }
                else {
                    // 失败
                    console.log("获取验证码失败:" + json["reason"]);

                }
            }
            else if (what == Constants.YHWhat.app.sendToolPage) {
                var status = json["status"];
                if (status == Constants.status.success) {
                    // 成功
                    console.log("成功!");
                }
                else {
                    // 失败
                    console.log("失败:" + json["reason"]);
                }
            }
            else if (what == Constants.YHWhat.rongcloud.totalContacts) {
                var status = json["status"];
                if (status == Constants.status.success) {
                    // 成功
                    var totalMessges=json.data;
                    console.log("消息总数~~",totalMessges[0]);
                    if(totalMessges[0]==0){
                        $scope.isShowNoReadMessage = false;
                    }else {
                        $scope.isShowNoReadMessage = true;
                    }
                    if(totalMessges[0]>99){
                        $scope.NoReadMessageNum='99﹢'
                    }
                    else{
                        $scope.NoReadMessageNum=totalMessges[0];
                    }
                }
                else {
                    // 失败
                    console.log("失败:" + json["reason"]);

                }
            }

        }
        catch (error) {
            alert("error" + error);
        }
    });
/*    $rootScope.$on('YHUserInfoMessages', function (event, json) {
        try{
            $scope.$broadcast('YHUserInfoMessages', json);
        }
        catch(error){
        }
        console.log("!!!!!!!!!!!!!!!",json);
    });*/
    $scope.isShowNoReadMessage = false;
    JSCommand.rongcloud.getTotalContacts();

    $scope.newFriendCount = 0;
    $scope.updateNewFriendCount = function(){
        console.log("update my friend count...");
        var myself = JSCache.get(Constants.YHCache.loginInfo);
        if(myself){
            $scope.newFriendCount = myself.friendApplyCount;
        }

        console.log("update my friend count:",  $scope.newFriendCount);
    };
    $scope.updateNewFriendCount();

    $scope.hasNewFriend = function(){
        return !($scope.newFriendCount == 0);
    };

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

        console.log("change state from " + fromState.name + " to " + toState.name);

        $scope.toState = toState;
        $scope.toParams = toParams;
        $scope.fromState = fromState;
        $scope.fromParams = fromParams;

        // 如果是修车宝页面，则不需要登录
        if (toState.data && toState.data.didNotNeedLogin) {
            // 参考tab.tool/index.js
            var title = "tab.tool";
            if(toState.title){
                title = toState.title;
            }
            JSCommand.app.sendToolPage(0, title);
            console.log('这是跳转到修车宝的页面，不需要登录。');

        } else {
            if(toState.title){
                JSCommand.app.sendToolPage(0, toState.title);
            }
            else{
                JSCommand.app.sendToolPage(1, '');
            }

            console.log('需要登录');
            var isLogin = JSCache.get(Constants.YHCache.loginInfo);
            if (!isLogin) {

                console.log('但是没有登录');

                event.preventDefault();

                var backgroudUserName = JSCache.get(Constants.YHCache.userName);
                console.log("backgroudUserName is " + backgroudUserName);
                if(JSUtils.validString(backgroudUserName)){

                    console.log("login with username...");
                    JSCommand.ccdp.login(backgroudUserName, '');
                    $scope.loginbackground = true;
                }
                else{
                    console.log("show login dialog...");
                    $scope.loginbackground = false;
                    $rootScope.showTabs = true;
                    $scope.modalLogin.show();
                }
            }
            else {
                console.log('且已经登陆');
            }
        }
    });


    // dead code for test, you should delete when you publish this apk
    // login
     /*$scope.user.username = '15296576299';
     $scope.user.captcha = '8888';*/
    /*$scope.user.username = '13737725200';
    $scope.user.captcha = '1111';*/
    $scope.login = function () {

        // 开始登录
        var username = $scope.user.username;
        var captcha = $scope.user.captcha;
        JSCommand.ccdp.login(username, captcha);

        // 提示用户正在登录
        $scope.isLoading = true;
        
        // 这里需要把原来的登录数据清掉
        JSCache.remove(Constants.YHCache.loginInfo);
    };

    //请求验证码接口
    $scope.requestCaptcha = function () {
        document.getElementById('J-buttonCalm').innerHTML = '';

        // 通知服务器再次发送验证码
        JSCommand.ccdp.sendVerificationCode($scope.user.username);

        // 更新重新发送验证码的时间间隔
        $scope.countdown = 60;
        $scope.myTime = $interval(function () {
            $scope.countdown--;
            if ($scope.countdown <= 0) {
                $interval.cancel($scope.myTime);
                document.getElementById('J-buttonCalm').innerHTML = '发送验证码';
            }
        }, 1000);

    };


    $scope.modalLogin = $ionicModal.fromTemplate(require('./modal-login.html'), {
        scope: $scope,
        animation: 'slide-in-up'
    });

    $scope.modalLicense = $ionicModal.fromTemplate(require('./modal-License.html'), {
        scope: $scope,
        animation: 'slide-in-up'
    });

    $scope.openLicense = function () {
        $scope.modalLicense.show();
    };

    $scope.backFromLicense = function () {
        $scope.modalLicense.hide();
    };

    $scope.closeModal = function () {
        console.log("close login modal...");
        $scope.modalLogin.hide().then(function () {
            // $state.go("tab.tool");
            // $scope.modalLogin.remove();
            $ionicTabsDelegate.$getByHandle('my-handle').select(0);
        });
    };

    $scope.returnCircle = function () {
        $ionicHistory.clearHistory();
        $state.go('tab.circle.friends');
    };

    function valiUserName () {
        if (angular.isDefined($scope.user.username)) {
            if($scope.user.username.length < 12){
                $scope.flag = false;
                var regex = /^[0-9]*$/;  // ^[0-9]*$
                if(!regex.test($scope.user.username)){
                    $scope.user.username = $scope.user.username.replace(/[^\d]/g,'')
                }
                if($scope.user.username.length == 11){
                    var regex = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
                    $scope.flag = !!regex.test($scope.user.username);
                }
            }

        }
    }

    // 对手机号码进行监控，使之必须符合手机号码格式
    $scope.$watch('user.username', function () {
        //正确获取字符串长度
        if (typeof $scope.user.username != "string"){
            $scope.user.username += "";
        }
        console.log('$user.userName',$scope.user.username.length);
        valiUserName ();
    }, true);


    // 对验证码进行监控，使之必须符合数字要求格式
    $scope.$watch('user.captcha', function () {

        if (angular.isDefined($scope.user.captcha)) {
            if($scope.user.captcha.length < 5){
                $scope.captchaFlag = false;
                var regex = /^[0-9]*$/;  // ^[0-9]*$
                if(!regex.test($scope.user.captcha)){
                    $scope.user.captcha = $scope.user.captcha.replace(/[^\d]/g,'')
                }
                if($scope.user.captcha.length  == 4){
                    var regex = /^\d{4}$/;
                    $scope.captchaFlag = !!regex.test($scope.user.captcha);
                }
            }
        }
    });

    $scope.beAbleToRequestCaptcha = function (countdown) {

        return !(!$scope.flag == true || countdown > 0)

    };

    $scope.beAbleToLogin = function () {

        var username = $scope.user.username;
        var captcha = $scope.user.captcha;
        var isAccepted = $scope.user.acceptLicense;

        return (_.isBoolean(isAccepted) && isAccepted) &&
            (_.isString(username) && username.trim().length > 0) &&
            (_.isString(captcha) && captcha.trim().length > 0);
    };

    $scope.beErrorMessage = function () {
        var username = $scope.user.username;
        return (_.isString(username) && username.trim().length > 0);
    };


    //监听是否是主页面 通知Android;
    $rootScope.$watch('showTabs', function (newValue) {
        if (newValue) {
            JSCommand.app.homePageAuthorizationNotice();
        } else if (!newValue) {
            JSCommand.app.subPageFrameAuthorizationNotice();
        }
    }, true);

    $rootScope.$watch('showTabs', function (newValue) {
        if (newValue) {
            JSCommand.app.homePageAuthorizationNotice();
        } else if (!newValue) {
            JSCommand.app.subPageFrameAuthorizationNotice();
        }
    }, true);

    $scope.safeApply = function(fn) {
        var phase = this.$root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

    $rootScope.$on('YHNewFriend', function (event, json) {
        console.log("receive the broadcast message YHNewFriend.");
        var countNewFriends= JSCache.get(Constants.YHCache.loginInfo);
        if(countNewFriends){
            $scope.safeApply(function(){
                $scope.newFriendCount = countNewFriends.friendApplyCount;
                console.log("apply new friends count to parameter: ", $scope.newFriendCount);
            });
        }
    });
};

Main.$inject = [
    '$scope',
    '$rootScope',
    '$state',
    '$timeout',
    '$ionicModal',
    '$interval',
    '$ionicTabsDelegate',
    '$cookies',
    '$ionicNavBarDelegate',
    '$ionicHistory',
    '$ionicPopup',
    'FriendRelationManager',
    'Constants',
    'JSCache',
    'JSCommand',
    'JSUtils'
];

module.exports = Main;