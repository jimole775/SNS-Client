/**
 * Created by Administrator on 2016/1/6.
 */
var JSCommand = function (JSTransport, Constants) {

    return {
        rongcloud: {
            // 发送文本消息
            sendTextMessage: function (targetId, text, conversationType) {
                var message = {};
                message["what"] = Constants.YHWhat.rongcloud.sendTestMessage;
                message["message"] = text;
                message["conversationType"] = conversationType;
                message["targetId"] = targetId;
                return JSTransport.sendEx(message);
            },
            // 发送文本消息语音
            sendVoiceMessage: function (target, voiceURL, conversationType) {
                var message = {};
                message["what"] = Constants.YHWhat.rongcloud.sendVoiceMessage;
                message["message"] = text;
                message["conversationType"] = conversationType;
                message["targetId"] = targetId;
                return JSTransport.sendEx(message);
            },
            // 获取会话信息
            getConversation: function (targetId, conversationType) {
                var message = {};
                message["what"] = Constants.YHWhat.rongcloud.getConversation;
                message["conversationType"] = conversationType;
                message["targetId"] = targetId;
                return JSTransport.sendEx(message);
            },
            //  获取会话列表
            getConversationList: function () {
                var message = {};
                message["what"] = Constants.YHWhat.rongcloud.getConversationList;
                return JSTransport.sendEx(message);
            },
            // 清除会话
            clearConversations: function () {
                var message = {};
                message["what"] = Constants.YHWhat.rongcloud.clearConversation;
                return JSTransport.sendEx(message);
            },
            // 获取历史消息
            getHistoryMessages: function (targetId, conversationType, oldestMessageId, count) {
                var message = {};
                message["what"] = Constants.YHWhat.rongcloud.getHistoryMessages;
                message["targetId"] = targetId;
                message["conversationType"] = conversationType;
                message["oldestMessageId"] = oldestMessageId;
                message["count"] = count;
                return JSTransport.sendEx(message);
            },
            // 获取最新的消息
            getLatestMessages: function (targetId, conversationType, count) {
                var message = {};
                message["what"] = Constants.YHWhat.rongcloud.getLatestMessages;
                message["targetId"] = targetId;
                message["conversationType"] = conversationType;
                message["count"] = count;
                return JSTransport.sendEx(message);
            },
            // 退出会话
            exitConversation: function (targetId, conversationType) {
                var message = {};
                message["what"] = Constants.YHWhat.rongcloud.exitConversation;
                message["targetId"] = targetId;
                message["conversationType"] = conversationType;
                return JSTransport.sendEx(message);
            },
            // 新建 或者 修改 群
            /*createOrRefreshGroup: function (group) {
                var message = {};
                message["what"] = Constants.YHWhat.rongcloud.createOrRefreshGroup;
                message["group"] = group;
                return JSTransport.sendEx(message);
            },*/
            //获取消息总数
            getTotalContacts: function () {
                var message = {};
                message["what"] = Constants.YHWhat.rongcloud.totalContacts;
                return JSTransport.sendEx(message);
            },
            //获取单根未读消息总数
            getPersonalUnreadMessages: function (targetId,conversationType) {
                var message = {};
                message["what"] = Constants.YHWhat.rongcloud.personalUnreadMessages;
                message["targetId"] = targetId;
                message["conversationType"] = conversationType;
                return JSTransport.sendEx(message);
            }
        },
        ccdp: {
            // 通过用户名和密码登录
            login: function (username, password) {
                var message = {};
                message["what"] = Constants.YHWhat.ccdp.CCDP_LOGIN;
                message["username"] = username;
                message["password"] = password;
                return JSTransport.sendEx(message);
            },
            // 通过token登录
            loginEx: function (token) {
                var message = {};
                message["what"] = Constants.YHWhat.ccdp.CCDP_LOGIN;
                message["token"] = token;
                return JSTransport.sendEx(message);
            },
            // 发送验证码
            sendVerificationCode: function (userName) {
                var message = {};
                message["what"] = Constants.YHWhat.ccdp.CCDP_SEND_CAPTCHA;
                message["userName"] = userName;
                return JSTransport.sendEx(message);
            },
            // 登出
            logout: function () {
                var message = {};
                message["what"] = Constants.YHWhat.ccdp.CCDP_LOGOUT;
                return JSTransport.sendEx(message);
            },
            // 心跳, 在JS端这个函数不会用到
            heartbeat : function(){
                var message = {};
                message["what"] = Constants.YHWhat.ccdp.CCDP_HEARTBEAT;
                return JSTransport.sendEx(message);
            },
            // 激活设备
            activeDevice : function(userId, deviceId, alias, address, phone, company, qq){
                // 0x00A40005
                var message = {};
                message["what"] = Constants.YHWhat.ccdp.CCDP_ADD_ACTIVEINFO;
                message["userId"] = userId;
                message["deviceId"] = deviceId;
                message["alias"] = alias;
                message["address"] = address;
                message["phone"] = phone;
                message["company"] = company;
                message["qq"] = qq;
                return JSTransport.sendEx(message);
            },
            // 判读设备是否激活
            judgeDevice : function(deviceId){
                // 0x00A40006
                var message = {};
                message["what"] = Constants.YHWhat.ccdp.CCDP_ADD_JUDGEACTIVEINFO;
                message["deviceId"] = deviceId;
                return JSTransport.sendEx(message);
            },
            // 图片上传
            uploadImage : function(){
                var message = {};
                message["what"] = Constants.YHWhat.ccdp.CCDP_UPLOAD_IMAGE;
                return JSTransport.sendEx(message);
            },
            // 查询品牌列表
            queryBrandList : function(brandId){
                // 0x00A40008
                var message = {};
                message["what"] = Constants.YHWhat.ccdp.CCDP_QUERY_BRANDLIST;
                message["brandId"] = brandId;
                return JSTransport.sendEx(message);
            },
            // 查询服务列表
            queryServeList : function(seriesId){
                // 0x00A40009
                var message = {};
                message["what"] = Constants.YHWhat.ccdp.CCDP_QUERY_SERVELIST;
                message["seriesId"] = seriesId;
                return JSTransport.sendEx(message);
            },
            // 查询用户详情
            queryUserDetail : function(userId){
                // 0x00A4000A
                var message = {};
                message["what"] = Constants.YHWhat.ccdp.CCDP_QUERY_USERDETAILINFO;
                message["userId"] = userId;
                return JSTransport.sendEx(message);
            },
            // 修改用户信息
            modifyUser : function(key, value, imgName){
                // 0x00A4000C
                var message = {};
                message["what"] = Constants.YHWhat.ccdp.CCDP_MODIFY_USERINFO;
                message["key"] = key;
                message["value"] = value;
                message["imgName"] = imgName;
                return JSTransport.sendEx(message);
            },
            // 查询用户个人资料
            queryUser : function(){
                // 0x00A4000D
                var message = {};
                message["what"] = Constants.YHWhat.ccdp.CCDP_QUERY_USERINFO;
                return JSTransport.sendEx(message);
            },
            // 按条件查询用户
            queryUserByCondition : function(pageNum, pageSize, filter){
                var message = {};
                message["what"] = Constants.YHWhat.ccdp.CCDP_QUERY_USERBYCONDITIONS;
                message["pageNum"] = pageNum;
                message["pageSize"] = pageSize;
                message["filter"] = filter;
                return JSTransport.sendEx(message);
            },
            // 申请实名认证
            authenticationUser : function(realName,cardId,frontPhotoName,backPhotoName ){
                var message = {};
                message["what"] = Constants.YHWhat.ccdp.CCDP_ADD_USERAUTHENTICATION;
                message["realName"] = realName;
                message["cardId"] = cardId;
                message["frontPhotoName"] = frontPhotoName;
                message["backPhotoName"] = backPhotoName;
                return JSTransport.sendEx(message);
            },
            // 获取融云token, js应该不会调用，有android调用
            getRongCloudToken : function(){
                var message = {};
                message["what"] = Constants.YHWhat.ccdp.CCDP_GET_RONG_TOKEN;
                return JSTransport.sendEx(message);
            },
            // 请求远程协助
            requestRemoteAssist : function(minor){
                var message = {};
                message["what"] = Constants.YHWhat.ccdp.CCDP_REQ_ASSIST;
                message["minor"] = minor;
                return JSTransport.sendEx(message);
            },
            // 接受远程协助
            acceptRemoteAssist : function(major){
                var message = {};
                message["what"] = Constants.YHWhat.ccdp.CCDP_ACCEPT_ASSIST;
                message["major"] = major;
                return JSTransport.sendEx(message);
            },
            // 结束远程协助
            finishRemoteAssist : function(minor, assistId){
                var message = {};
                message["what"] = Constants.YHWhat.ccdp.CCDP_END_ASSIST;
                message["minor"] = minor;
                message["assistId"] = assistId;
                return JSTransport.sendEx(message);
            },
            // 查询我协助的记录列表
            queryAssistFromMe : function(pageNum){
                var message = {};
                message["what"] = Constants.YHWhat.ccdp.CCDP_QUERY_ASSISTMETO;
                message["pageNum"] = pageNum;
                return JSTransport.sendEx(message);
            },
            // 查询协助我的记录列表
            queryAssistToMe : function(pageNum){
                var message = {};
                message["what"] = Constants.YHWhat.ccdp.CCDP_QUERY_ASSISTTOME;
                message["pageNum"] = pageNum;
                return JSTransport.sendEx(message);
            },
            // 填写协助报告
            generateAssistReport : function(assistId, major, minor, resolved, reason, solution){
                var message = {};
                message["what"] = Constants.YHWhat.ccdp.CCDP_UPDATE_ASSISTREPORT;
                message["assistId"] = assistId;
                message["major"] = major;
                message["minor"] = minor;
                message["resolved"] = resolved;
                message["reason"] = reason;
                message["solution"] = solution;
                return JSTransport.sendEx(message);
            },
            // 评价
            evaluate : function(assistId, major, minor, resolved){
                var message = {};
                message["what"] = Constants.YHWhat.ccdp.CCDP_ADD_EVALUATE;
                message["assistId"] = assistId;
                message["major"] = major;
                message["minor"] = minor;
                message["resolved"] = resolved;
                return JSTransport.sendEx(message);
            },
            // 查询原因列表
            queryReasonList : function(){
                var message = {};
                message["what"] = Constants.YHWhat.ccdp.CCDP_QUERY_REASON;
                return JSTransport.sendEx(message);
            },
            // 筛选条件选项列表: 条件类型，数字，0：品牌列表; 1: 服务项目列表; 2: 专家等级列表; 3: 专家好评列表; 4: 距离列表 5: 是否在线列表
            queryFilterList : function(type){
                var message = {};
                message["what"] = Constants.YHWhat.ccdp.CCDP_QUERY_FILTERLIST;
                message["type"] = type;
                return JSTransport.sendEx(message);
            },
            // 查询好友列表
            queryMyFriends : function(){
                var message = {};
                message["what"] = Constants.YHWhat.ccdp.CCDP_QUERY_MYFRIEND;
                return JSTransport.sendEx(message);
            },
            // 查询通讯录好友列表:手机通讯录的号码列表,应序列化为JSON字符串，结构如下[‘18866662222’,’13300004444’]
            queryContactsFriends : function(userList){
                var message = {};
                message["what"] = Constants.YHWhat.ccdp.CCDP_QUERY_CONTACTSFRIEND;
                message["userList"] = userList;
                return JSTransport.sendEx(message);
            },
            // 添加好友
            addFriend : function(friendId){
                var message = {};
                message["what"] = Constants.YHWhat.ccdp.CCDP_ADD_FRIEND;
                message["friendId"] = friendId;
                return JSTransport.sendEx(message);
            },
            // 接受好友
            acceptFriend : function(friendId){
                var message = {};
                message["what"] = Constants.YHWhat.ccdp.CCDP_ACCEPT_FRIEND;
                message["friendId"] = friendId;
                return JSTransport.sendEx(message);
            },
            // 拒绝或者删除好友
            deleteFriend : function(friendId){
                var message = {};
                message["what"] = Constants.YHWhat.ccdp.CCDP_DELETE_FRIEND;
                message["friendId"] = friendId;
                return JSTransport.sendEx(message);
            },
            // 查找群列表
            queryGroupList : function(){
                var message = {};
                message["what"] = Constants.YHWhat.ccdp.CCDP_QUERY_GROUP;
                return JSTransport.sendEx(message);
            },
            // 新建群组
            /*
             {
                 'name': '群123',
                 'icon': 'abc.def',
                 'groupNickName': '群456456',
                 'isAllowStranger': 0,
                 'isAllowSearch': 0,
                 'isNoDisturb': 0,
                 'userIdList': [1, 2, 3, 4, 5]
             }
             */
            addGroup : function(group){
                var message = {};
                message["what"] = Constants.YHWhat.ccdp.CCDP_ADD_GROUP;
                message["group"] = group;
                return JSTransport.sendEx(message);
            },
            // 查询群信息
            queryGroupDetail : function(groupId){
                var message = {};
                message["what"] = Constants.YHWhat.ccdp.CCDP_QUERY_GROUPINFO;
                message["groupId"] = groupId;
                return JSTransport.sendEx(message);
            },
            // 退出或解散群组
            quit_deleteGroup : function(groupId){
                var message = {};
                message["what"] = Constants.YHWhat.ccdp.CCDP_QUITORDELETE_GROUP;
                message["groupId"] = groupId;
                return JSTransport.sendEx(message);
            },
            // 更新群组
            /*
                key:（1-增加群成员，2-删除群成员，3-修改群头像，4-修改群名称，5-修改用户群昵称，6-修改是否免打扰，7-修改是否允许陌生人加群，8-修改是否允许被搜索）
                value : 要修改的字段的值，byte[]，其中当增加群成员时，回传的数据应序列化为JSON字符串，格式为：["33","12","3321"]
                imgName_or_userId: 当更新群头像时该值传群头像文件名（字符串类型），否则传用户id（数字）
             */
            updateGroup : function(groupId, key, value, imgName_or_userId){
                var message = {};
                message["what"] = Constants.YHWhat.ccdp.CCDP_UPDATE_GROUP;
                message["groupId"] = groupId;
                message["key"] = key;
                message["value"] = value;
                if(key==3){
                    message["imgName"] = imgName_or_userId;
                }
                else{
                    message["userId"] = imgName_or_userId;
                }

                return JSTransport.sendEx(message);
            },
            // 添加举报群组
            /*
             reportReason:举报原因，字符串
             chatLog:聊天记录，字符串
             imgEvidence:图片证据，应序列化为JSON字符串再以 String 填入 	pkg，结构如下[‘18866662222.jpg’,’13300004444.jpg’]
             */
            reportGroup : function(reportedId, reportReason, chatLog, imgEvidence){
                var message = {};
                message["what"] = Constants.YHWhat.ccdp.CCDP_ADD_REPORTGROUP;
                message["reportedId"] = reportedId;
                message["reportReason"] = reportReason;
                message["chatLog"] = chatLog;
                message["imgEvidence"] = imgEvidence;
                return JSTransport.sendEx(message);
            },
            // 查询举报原因列表
            queryReportReason : function(){
                var message = {};
                message["what"] = Constants.YHWhat.ccdp.CCDP_QUERY_REPORTREASON;
                return JSTransport.sendEx(message);
            },
            // 删除协助我的记录
            deleteAssistToMe : function(){
                var message = {};
                message["what"] = Constants.YHWhat.ccdp.CCDP_DELETE_ASSISTTOMERECORD;
                return JSTransport.sendEx(message);
            },
            // 删除我协助的记录
            deleteAssistFromMe : function(){
                var message = {};
                message["what"] = Constants.YHWhat.ccdp.CCDP_DELETE_ASSISTMETORECORD;
                return JSTransport.sendEx(message);
            },
            // 查询好友关系列表
            queryFriendRelation : function(){
                var message = {};
                message["what"] = Constants.YHWhat.ccdp.CCDP_QUERY_FRIENDRELATION;
                return JSTransport.sendEx(message);
            },
            //监听好友推送关系
            getNewFriendTotal: function () {
                var message = {};
                message["what"] = Constants.YHWhat.ccdp.CCDP_PUSH_FRIENDRELATION;
                return JSTransport.sendEx(message);
            }
            //监听发送文件消息成功
            /*getNewFilesMessage: function () {
                var message = {};
                message["what"] = Constants.YHWhat.ccdp.CCDP_SEND_FILES;
                return JSTransport.sendEx(message);

            }*/
        },  // RPC 相关
        app: {
            // 读取首页数据
            loadIndexPage: function () {
                var message = {};
                message["what"] = Constants.YHWhat.app.loadIndexPage;
                return JSTransport.sendEx(message);
            },
            // 开始录音
            startRecord: function () {
                var message = {};
                message["what"] = Constants.YHWhat.app.startRecord;
                return JSTransport.sendEx(message);
            },
            // 停止录音
            stopRecord: function (targetId,conversationType) {
                var message = {};
                message["what"] = Constants.YHWhat.app.stopRecord;
                message["targetId"] = targetId;
                message["conversationType"] = conversationType;
                return JSTransport.sendEx(message);
            },

            // 播放语音
            playVoice: function (filePath) {
                var message = {};
                message["what"] = Constants.YHWhat.app.playVoice;
                message["filePath"] = filePath;

                return JSTransport.sendEx(message);
            },

            // 页面跳转
            switchPages: function (page) {
                var message = {};
                message["what"] = Constants.YHWhat.app.switchPage;
                message["page"] = page;
                return JSTransport.sendEx(message);
            },
            // 调用聊天界面的功能
            callChatFunction: function (func) {
                var message = {};
                message["what"] = Constants.YHWhat.app.callChatFunction;
                message["func"] = func;
                return JSTransport.sendEx(message);
            },
            homePageAuthorizationNotice: function () {
                var message = {};
                //APPService.request(Constants.APP_CMD.request.homePageAuthorizationNotice,params);
            },
            subPageFrameAuthorizationNotice: function () {
                var message = {};
                //APPService.request(Constants.APP_CMD.request.subPageAuthorizationNotice,params);
            },
            getPreviewImage: function (id, cmd, key) {
                var message = {};
                message["what"] = Constants.YHWhat.app.previewImage;
                message["id"] = id;
                message["cmd"] = cmd;
                message["key"] = key;
                //message["Params"] = JSON.stringify(Params);
                return JSTransport.sendEx(message);
            },
            CCDPBusinessAPP2PC: function (Params) {
                var message = {};
                message["what"] = Constants.YHWhat.app.CCDPBusinessAPP2PC;
                message["Params"] = JSON.stringify(Params);
                return JSTransport.sendEx(message);
            },
            getCCDPBusinessList: function (Params) {
                var message = {};
                message["what"] = Constants.YHWhat.app.getCCDPBusinessList;
                message["Params"] = Params;
                return JSTransport.sendEx(message);
            },
            sendCarInfoMessage: function (conversationType, targetId, content, pushContent, pushData) {
                var message = {};
                message["what"] = Constants.YHWhat.app.sendVehicleInformation;
                message["conversationType"] = conversationType;
                message["targetId"] = targetId;
                message["content"] = content;
                message["targetId"] = pushContent;
                message["targetId"] = pushData;
                return JSTransport.sendEx(message);
            },
            //系统设置
            getCCDPBusinessSystemSetting: function () {
                var message = {};
                message["what"] = Constants.YHWhat.app.CCDPBusinessSystemSetting;
                return JSTransport.sendEx(message);
            },
            //wifi连接状态
            getSettingNetCont: function () {
                var message = {};
                message["what"] = Constants.YHWhat.app.settingNetCont;
                return JSTransport.sendEx(message);
            },
            //设备连接状态
            getSettingDevCont: function () {
                var message = {};
                message["what"] = Constants.YHWhat.app.SettingDevCont;
                return JSTransport.sendEx(message);
            },
            getCCDPBusinessCheckDevConnect: function () {
                var message = {};
                message["what"] = Constants.YHWhat.app.CCDPBusinessCheckDevConnect;
                return JSTransport.sendEx(message);
            },
            //发送给app所处位置
            sendToolPage: function (page, title) {
                var message = {};
                message["what"] = Constants.YHWhat.app.sendToolPage;
                message["page"] = page;
                message['title'] = title;
                return JSTransport.sendEx(message);
            },
             //发送图片
            sendPicCont: function (targetId,conversationType) {
                var message = {};
                message["what"] = Constants.YHWhat.app.sendPic;
                message["targetId"] = targetId;
                message['conversationType'] = conversationType;
                return JSTransport.sendEx(message);
            },
            //文件传输
            sendFilesCont: function (targetId,conversationType) {
                var message = {};
                message["what"] = Constants.YHWhat.app.sendFiles;
                message["targetId"] = targetId;
                message['conversationType'] = conversationType;
                return JSTransport.sendEx(message);
            },
            //文件下载
            downFilesCont: function (senderId,url,fileName) {
                var message = {};
                message["what"] = Constants.YHWhat.app.downFiles;
                message["senderId"] = senderId;
                message['url'] = url;
                message['fileName'] = fileName;
                return JSTransport.sendEx(message);
            }
        }
    }

};

JSCommand.$inject = [
    'JSTransport',
    'Constants'
];

module.exports = JSCommand;