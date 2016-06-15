/**
 * Created by tapes on 2015/6/30.
 */

// Ionic Starter App
var appModule = module.exports = angular.module(
    'app',
    [
        'ionic',
        require('./common').name,
        require('./tabs').name,
        require('./tabs.tool').name,
        require('./tabs.circle').name,
        require('./tabs.conversation').name,
        require('./tabs.home').name

    ])
    .config(['$ionicConfigProvider', function ($ionicConfigProvider) {

        $ionicConfigProvider.tabs.position('bottom');
        $ionicConfigProvider.tabs.style('standard');
        $ionicConfigProvider.backButton.previousTitleText(false);
        $ionicConfigProvider.backButton.icon('iconfont icon-return return-size');
        $ionicConfigProvider.navBar.alignTitle('center');
        $ionicConfigProvider.views.transition('platform');
        $ionicConfigProvider.views.maxCache(10);
        $ionicConfigProvider.form.checkbox('circle');
    }])
    .run(['$rootScope', function ($rootScope) {

        // 默认先隐藏底部 Tabs
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.showTabs = false;
        });

        // 根据实际情况 toState.data.showTabs 来决定是否显示 Tabs
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.showTabs = toState.data && toState.data.showTabs;
        });
    }])
    .run(['$ionicHistory','Constants' , 'JSTransport', 'JSCache', '$state', '$rootScope', '$ionicTabsDelegate',
        function ($ionicHistory, Constants, JSTransport, JSCache, $state, $rootScope, $ionicTabsDelegate) {

        window.YHAndroidToJs = {
            sendToJS: function (message) {
                var json = JSON.parse(message);
                JSTransport.receive(json);

                var what = json['what'];
                if(what == Constants.YHWhat.app.sendToolPage){
                    var title = json['title'];
                    var total = json['total'];
                    if(total > 0){
                        $ionicHistory.goback(-1);
                        //if(title == null || title == ''){
                        //    $ionicHistory.goback(-1);
                        //}
                        //else{
                        //    $state.go(title);
                        //}
                    }
                }
                else if(what == Constants.YHWhat.ccdp.CCDP_PUSH_BEKICKED){
                    console.log("用户在其他地方登录.");
                    $state.go('tab.tool');
                    JSCache.remove(Constants.YHCache.loginInfo);
                }
                else if (what === Constants.YHWhat.ccdp.CCDP_PUSH_REQASSIST) {
                    $ionicTabsDelegate.$getByHandle('my-handle').select(2);
                    // $state.go("tab.conversations.conversation-list");
                    setTimeout(function () {
                        $rootScope.$broadcast('YHRemote', json);
                    }, 50);
                }
                console.log('接收到APP发来指令为', message);
            }
        };
    }])

    .run(['$state', function ($state) {
        // 默认跳转到技师圈模块
        $state.go('tab.tool');
    }])
    .run(['$rootScope', '$state', '$ionicHistory', function ($rootScope, $state, $ionicHistory) {

        $rootScope.__goToViewAsTop = function (stateName, params, options) {

            params = params || {};
            options = options || {};

            $ionicHistory.nextViewOptions({
                //disableBack: false,
                historyRoot: true
            });

            $state.go(stateName, params, options);
        };

    }]);

ionic.Platform.ready(function () {

    // 延迟 500ms 加载启动应用
    // 以便浏览器有足够的时间加载 sourceMap 文件
    //angular.bootstrap(window.document.body, [appModule.name], {
    //    strictDi: true
    //});
    // 延迟 500ms 加载启动应用
    // 以便浏览器有足够的时间加载 sourceMap 文件
    setTimeout(function () {
        angular.bootstrap(window.document.body, [appModule.name], {
            strictDi: true
        });
    }, 50);

});
