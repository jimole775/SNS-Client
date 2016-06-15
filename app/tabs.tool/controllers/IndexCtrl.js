/**
 * Created by tapes on 2015/6/30.
 */

var _ = require('underscore');

var IndexCtrl = function ($scope,
                          $state,
                          $ionicPopup,
                          $rootScope,
                          Constants,
                          JSCache,
                          JSCommand,
                          base64) {

    console.log("enter the ccdp main page...");
    $scope.wifiSettingStatus = '';
    $scope.DevSettingStatus = '';
    $scope.$on('YHJSReceiver', function (event, json) {
        try {
            var what = json.what;
            if (what == Constants.YHWhat.app.loadIndexPage) {
                console.log("got the index index page data...");
                var encrypt = json.data;
                //var encrypt = $scope.encryp_mock;
                var html = "";
                try {
                    html = base64.decode(encrypt);
                }
                catch (e) {
                    console.log("base 64 decode error:", e);
                }

                document.getElementById("mainPages").innerHTML = html;

                setTimeout(function () {
                    var navTab = document.getElementById('index_page_first_ccdp');
                    var navTab_childNode = navTab != null ? navTab.getElementsByTagName('li') : [];
                    var contents = document.getElementsByClassName('index-list');
                    var contentsBox = contents[0].parentNode;

                    //给所有标签页添加下标；
                    for (var i = 0; i < navTab_childNode.length; i++) {
                        navTab_childNode[i].index = i;
                        contents[i].index = i;
                    }
                    bindClick();
                    //bindSlide();
                    //tabNav点击事件
                    function bindClick() {
                        for (var i = 0; i < navTab_childNode.length; i++) {
                            navTab_childNode[i].childNodes[1].onclick = function (el) {
                                var curTarget = el.target.parentNode; //当前标签 curTarget == ‘li’
                                //先清除class 'on'
                                for (var k = 0; k < navTab_childNode.length; k++) {
                                    navTab_childNode[k].className = "";
                                }

                                //当前元素添加class ‘on’
                                navTab_childNode[curTarget.index].className = "on";

                                //先清除class 'on'
                                for (var j = 0; j < contents.length; j++) {
                                    contents[j].style.display = 'none';
                                }

                                if (contents[curTarget.index])contents[curTarget.index].style.display = 'block';
                            };
                        }
                    }

                    /*addHandler(document, move, function (e) {
                     var ev = 'ontouchmove' in document ? e.touches[0] : e;
                     var x = ev.pageX; // 这样就能在PC 和 手机上都拿到坐标值了
                     console.log(x);
                     });*/


                    //左右滑动会影响到滚动条，所以先不开放
                   /* function bindSlide() {
                        var downX = 0;
                        var upX = 0;
                        var moveX = 0;
                        var tabIndex;

                        //兼容 PC端鼠标事件 和 手机端触屏事件；
                        var addHandler = function (element, type, handler) {
                            if (element.addEventListener) {
                                element.addEventListener(type, handler, false);
                            } else if (element.attachEvent) {
                                element.attachEvent("on" + type, handler);
                            } else {
                                element["on" + type] = handler;
                            }
                        };

                        var move = 'ontouchmove' in document ? 'touchmove' : 'mousemove';
                        var down = 'ontouchstart' in document ? 'touchstart' : 'mousedown';
                        var up = 'ontouchend' in document ? 'touchend' : 'mouseup';

                        addHandler(contentsBox, down, function (event) {
                            event.preventDefault();             //解决touchmove只运行一次的问题
                            var ev = 'ontouchstart' in document ? event.touches[0] : event;
                            downX = ev.pageX;
                            //console.log('down',downX);
                            for (var i = 0; i < this.children.length; i++) {
                                if (this.children[i].style.display !== 'none') {
                                    tabIndex = i;
                                }
                            }
                            console.log(this, tabIndex);

                            //当按下事件触发time毫秒，自动触发停止事件
                            setTimeout(function () {
                                console.log('时间到了');
                                contentsBox.removeEventListener('touchmove');
                                contentsBox.removeEventListener('touchend');
                            }, 1000);
                        });

                        addHandler(contentsBox, up, function (event) {
                            var ev = 'ontouchend' in document ? (event.touches[0] ? event.touches[0] : event.changedTouches[0]) : event;
                            upX = ev.pageX;
                            //console.log('up',upX);
                            if (upX - downX >= this.offsetWidth * 0.15) {
                                console.log('向右划了', upX - downX);
                                //todo  内容窗体应该向右移动,下标做减法

                                slideRight(tabIndex);
                                this.removeEventListener('touchmove');
                                this.removeEventListener('touchend');
                            }
                            if (downX - upX >= this.offsetWidth * 0.15) {
                                console.log('向左划了', downX - upX);
                                //todo 内容窗体应该向左移动,下标做加法

                                slideLeft(tabIndex);
                                this.removeEventListener('touchmove');
                                this.removeEventListener('touchend');
                            }
                        });

                        addHandler(contentsBox, move, function (event) {
                            var ev = 'ontouchmove' in document ? event.touches[0] : event;
                            moveX = ev.pageX;
                            //console.log('move',moveX);
                            if (moveX >= this.offsetWidth - this.offsetWidth * 0.05 || moveX <= this.offsetWidth * 0.05) {
                                if (moveX - downX >= this.offsetWidth * 0.15) {
                                    console.log("向右滑动了20%,并且超出了屏幕");
                                    //todo  内容窗体应该向右移动,下标做减法

                                    slideRight(tabIndex);
                                    this.removeEventListener('touchmove');
                                    this.removeEventListener('touchend');

                                }
                                if (downX - moveX >= this.offsetWidth * 0.15) {
                                    console.log("向左滑动了20%,并且超出了屏幕");
                                    //todo 内容窗体应该向左移动,下标做加法

                                    slideLeft(tabIndex);
                                    this.removeEventListener('touchmove');
                                    this.removeEventListener('touchend');
                                }

                            }

                        });

                        function slideLeft(index) {
                            var tabIndex = index;
                            if (tabIndex == contents.length - 1) {
                                //tabIndex = -1;        //循环滑动
                                return;                 //非循环
                            }
                            for (var i = 0; i < contents.length; i++) {
                                contents[i].style.display = 'none';
                                navTab_childNode[i].className = "";

                            }

                            var tempElem = contents[++tabIndex];
                            var val = 0;
                            tempElem.style.opacity = val / 100;
                            tempElem.style.display = 'block';

                            var timer = setInterval(function () {
                                val += 20;
                                tempElem.style.opacity = val / 100;
                                if (val >= 100) {
                                    val = 0;
                                    clearInterval(timer);
                                }
                            }, 50);

                            //contents[++tabIndex].style.display = 'block';
                            navTab_childNode[tabIndex].className = "on";

                        }

                        function slideRight(index) {
                            var tabIndex = index;
                            if (tabIndex == 0) {
                                //tabIndex = contents.length;               //循环滑动
                                return;                                     //非循环
                            }
                            for (var i = 0; i < contents.length; i++) {
                                contents[i].style.display = 'none';
                                navTab_childNode[i].className = "";
                            }

                            var tempElem = contents[--tabIndex];
                            var val = 0;
                            tempElem.style.opacity = val / 100;
                            tempElem.style.display = 'block';
                            var timer = setInterval(function () {
                                val += 20;
                                tempElem.style.opacity = val / 100;
                                if (val >= 100) {
                                    val = 0;
                                    clearInterval(timer);
                                }
                            }, 50);

                            //contents[--tabIndex].style.display = 'block';
                            navTab_childNode[tabIndex].className = "on";

                        }

                    }*/


                }, 50);


            }
            else if (what === Constants.YHWhat.app.settingNetCont) {
                var status = json.status;
                if (status === Constants.status.success) {
                    $scope.$apply(function () {
                        $scope.wifiSettingStatus = json.data;
                    });
                    console.log('wifi连接状态:', $scope.wifiSettingStatus);
                }
            }
            else if (what === Constants.YHWhat.app.SettingDevCont) {
                $scope.$apply(function () {
                    $scope.DevSettingStatus = json.data;
                });

                console.log('设备连接状态:', $scope.DevSettingStatus);
            }
            else if (what === Constants.YHWhat.app.CCDPBusinessSystemSetting) {

            }
            else if (what === Constants.YHWhat.app.CCDPBusinessCheckDevConnect) {
                //$scope.DevSettingStatus = json;

            }
            else if (what == Constants.YHWhat.ccdp.CCDP_PUSH_FRIENDRELATION) {
                //监听添加好友
                var status = json["status"];
                if (status == Constants.status.success) {
                    console.log("json.data", json.data.msgs[0].value.user.relation);
                    if (json.data.msgs[0].value.user.relation === 1) {
                        $scope.countNewFirends = JSCache.get(Constants.YHCache.loginInfo);
                        if ($scope.countNewFirends.friendApplyCount > 99) {
                            $scope.countNewFirends.friendApplyCount = '99﹢';
                        } else {
                            $scope.countNewFirends.friendApplyCount = $scope.countNewFirends.friendApplyCount + 1;
                        }
                        JSCache.put(Constants.YHCache.loginInfo, $scope.countNewFirends);
                        //$rootScope.$broadcast('YHUserInfoMessages', $scope.countNewFirends);
                    }


                }
                else {
                    // 失败
                    console.log("失败:" + json["reason"]);

                }
            }

        } catch (error) {

        }
    });
    JSCommand.ccdp.getNewFriendTotal();
    /* JSCommand.app.getSettingNetCont();
     JSCommand.app.getSettingDevCont();*/
    $scope.clickLinkSet = function () {
        JSCommand.app.getCCDPBusinessCheckDevConnect();
    };
    $scope.loadIndexPage = function () {
        //$http({
        //    method: 'get',
        //    url: '/pages/Index.html',
        //    data: "",  // pass in data as strings
        //    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        //}).success(function (data) {
        //    document.getElementById("mainPages").innerHTML = data;
        //});
        JSCommand.app.loadIndexPage();

        /*console.log("start to load index page...");
         var msg = {};
         msg["what"] = Constants.YHWhat.app.loadIndexPage;
         var html = "";
         var data = base64.encode(html);
         msg["data"] = data;
         var sMessage = JSON.stringify(msg);
         window.YHAndroidToJs.sendToJS(sMessage);*/
    };
    $scope.loadIndexPage();

    var equipmentID1 = "24001D000D00E1005ACD000001AAE811";  //已激活
    var equipmentID2 = "24001D000D00E1005ACD000001AAE807";  //黑名单
    var equipmentID3 = "24001D000D00E1005ACD000001AAE805";  //入库未确认
    var equipmentID4 = "24001D000D00E1005ACD000001AAE803";  //已销售

    $scope.goToActive = function () {
        $state.go('tab.tool-active', {equipmentId: equipmentID1});
    };

    $scope.conversationItemList = Constants.rongCloud.ConversationType;

    $scope.form = {
        conversationType: Constants.rongCloud.ConversationType.PRIVATE,
        targetId: 13,
        text: 'Hello World'
    };

    $scope.sendMessage = function () {

        console.log($scope.form);

        var conversationType = parseInt($scope.form.conversationType, 10);
        var targetId = $scope.form.targetId;
        var content = $scope.form.text;
        var pushContent = '';
        var pushData = '';

        JSCommand.sendMessage(conversationType, targetId, content, pushContent, pushData, {
            // 发送消息成功
            onSuccess: function () {
                console.log('sendMessage success');
            },
            onError: function (errorCode) {

                console.log('onError: ', arguments);

                var info = '';
                switch (errorCode) {
                    case RongIMClient.callback.ErrorCode.TIMEOUT:
                        info = '超时';
                        break;
                    case RongIMClient.callback.ErrorCode.UNKNOWN_ERROR:
                        info = '未知错误';
                        break;
                    case RongIMClient.SendErrorStatus.REJECTED_BY_BLACKLIST:
                        info = '在黑名单中，无法向对方发送消息';
                        break;
                    case RongIMClient.SendErrorStatus.NOT_IN_DISCUSSION:
                        info = '不在讨论组中';
                        break;
                    case RongIMClient.SendErrorStatus.NOT_IN_GROUP:
                        info = '不在群组中';
                        break;
                    case RongIMClient.SendErrorStatus.NOT_IN_CHATROOM:
                        info = '不在聊天室中';
                        break;
                    default :
                        info = x;
                        break;
                }

                console.log('发送失败:' + info);
            }
        }, {
            onSuccess: function () {
                console.log('resultCallback onSuccess');
            },
            onError: function (errorCode) {
                console.log('resultCallback onError: ', arguments);
            }
        });
    };

    $scope.getConversationList = function () {
        JSCommand.getConversationList({
            onSuccess: function (conversationList) {
                console.log('conversationList: ', conversationList);

                _.forEach(conversationList, function (conversation) {
                    JSCommand.getHistoryMessages(Constants.rongCloud.ConversationType[conversation.conversationType], conversation.targetId, conversation.latestMessageId, 50, {
                        onSuccess: function (messageList) {
                            console.log('getHistoryMessages:', conversation.conversationType, ':', conversation.targetId, ' ', messageList);
                        },


                        onError: function (errorCode) {

                        }
                    });
                });
                debugger;
            },

            onError: function (errorCode) {

            }
        });
    };

    $scope.clearConversations = function () {
        JSCommand.clearConversations({
            onSuccess: function (isSuccess) {
                console.log('clearConversations: ', isSuccess);
            },

            onError: function (errorCode) {

            }
        }, Constants.rongCloud.ConversationType.CHATROOM, Constants.rongCloud.ConversationType.GROUP);
    };

    $scope.startRecord = function () {
        console.log('startRecord');
        RecordService.startRecord();
    };

    $scope.stopRecord = function () {
        console.log('stopRecord');
        RecordService.stopRecord({
            onSuccess: function (voiceEntity) {
                console.log('stopRecord onSuccess: ', voiceEntity);
            },

            onError: function () {
                console.log('stopRecord onError');
            }
        });
    };


    $scope.playVoice = function () {
        console.log('playVoice');
        VoiceService.playVoice();
    };

    //设置
    $scope.clickCCDPBusinessSystemSetting = function () {
        console.log("进入设置~");
        JSCommand.app.getCCDPBusinessSystemSetting();
    };

    /*
     //防盗匹配
     $scope.goToSecurityMatching = function () {
     var securityMatching = Constants.APP_CMD.request.CCDPBusinessSecurityMatching;
     JSCommand.goToCCDPBusiness(securityMatching);
     };

     //wifi 设置
     $scope.goToWifiSetting = function () {
     var wifiSetting = Constants.APP_CMD.request.CCDPBusinessWifiSetting;
     JSCommand.goToCCDPBusiness(wifiSetting);
     };


     // 设备连接
     $scope.goToCheckDevConnect = function () {
     var checkDevConnect = Constants.APP_CMD.request.CCDPBusinessCheckDevConnect;
     JSCommand.goToCCDPBusiness(checkDevConnect);
     };
     */

    ////监听事件传播 wifi 是否连接 1为连接  0为断开
    /*    $scope.$on(Constants.events.yhAppCallJs + Constants.APP_CMD.push.settingNetCont, function (event, result) {
     console.log('result', result);
     $scope.$apply(function () {
     $scope.wifiSettingStatus = result;
     });

     if (result === 0) {
     $rootScope.showTabs = true;
     }

     });*/
    //
    ////监听事件传播 设备是否连接
    //$scope.$on(Constants.events.yhAppCallJs + Constants.APP_CMD.push.CCDPBusinessSettingDevCont, function (event, result) {
    //    console.log('result', result);
    //    $scope.$apply(function () {
    //        $scope.DevSettingStatus = result;
    //    });
    //});


};

IndexCtrl.$inject = [
    '$scope',
    '$state',
    '$ionicPopup',
    '$rootScope',
    'Constants',
    'JSCache',
    'JSCommand',
    'base64'
];

module.exports = IndexCtrl;