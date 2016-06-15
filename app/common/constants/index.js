/**
 * Created by tapes on 2015/7/17.
 */

module.exports = {
    encoding: 'utf-8',
    status: {
        success: 0x00,
        fail: 0x01
    },
    YHCache: {
        userName : "--!userName!--",    // 这个变量存储的是用户名，在用户登录成功之后会把用户名存储在这个变量中
        loginInfo: '--!loginInfo!--',
        personData: '--!personData!--',
        brandListData:'--!brandListData!--',
        ServeListData:'--!ServeListData!--',
        assistListData:'--!assistListData!--',
        unRead:'--!unRead--'
    },
    YHWhat: {
        rongcloud: {
            sendTestMessage: 0x9001,
            sendVoiceMessage: 0x9002,
            sendImageMewssage:0x9003,
            getConversation: 0x9004,
            getConversationList: 0x9005,
            clearConversation: 0x9006,
            getHistoryMessages: 0x9006,
            getLatestMessages: 0x9009,
            exitConversation: 0xA008,
            totalContacts:0x9010,
            personalUnreadMessages:0x900A
        },
        ccdp: {
             CCDP_LOGIN : 0x00A40001,    // ,"CCDP-登录","CCDP"),
             CCDP_SEND_CAPTCHA : 0x00A40002,    // ,"CCDP-发送验证码","CCDP"),
             CCDP_LOGOUT : 0x00A40003,    // ,"CCDP-注销","CCDP"),
             CCDP_HEARTBEAT : 0x00A40004,    // ,"CCDP-心跳","CCDP"),
             CCDP_ADD_ACTIVEINFO : 0x00A40005,    // ,"CCDP-激活","CCDP"),
             CCDP_ADD_JUDGEACTIVEINFO : 0x00A40006,    // ,"CCDP-判断激活","CCDP"),
             CCDP_UPLOAD_IMAGE : 0x00A40007,    // ,"CCDP-图片上传","CCDP"),
             CCDP_QUERY_BRANDLIST : 0x00A40008,    // ,"CCDP-查询品牌列表","CCDP"),
             CCDP_QUERY_SERVELIST : 0x00A40009,    // ,"CCDP-查询服务列表","CCDP"),
             CCDP_QUERY_USERDETAILINFO : 0x00A4000A,    // ,"CCDP-查询用户详情","CCDP"),
             CCDP_MODIFY_USERINFO : 0x00A4000C,    // ,"CCDP-修改用户信息","CCDP"),
             CCDP_QUERY_USERINFO : 0x00A4000D,    // ,"CCDP-查询用户个人资料","CCDP"),
             CCDP_QUERY_USERBYCONDITIONS : 0x00A4000E,    // ,"CCDP-按条件查询用户","CCDP"),
             CCDP_ADD_USERAUTHENTICATION : 0x00A4000F,    // ,"CCDP-申请实名认证","CCDP"),
             CCDP_GET_RONG_TOKEN : 0x00A40010,    // ,"CCDP-获取融云token","CCDP"),

             CCDP_REQ_ASSIST : 0x00A40011,    // ,"CCDP-请求远程协助","CCDP"),
             CCDP_ACCEPT_ASSIST : 0x00A40012,    // ,"CCDP-接受远程协助","CCDP"),
             CCDP_END_ASSIST : 0x00A40013,    // ,"CCDP-结束远程协助","CCDP"),
             CCDP_PUSHDEVICEID : 0x00A40014,    // ,"CCDP-推送设备连接ID","CCDP"),
             CCDP_PUSHREMOTECONTROL : 0x00A40015,    // ,"CCDP-推送远程控制信息","CCDP"),
             CCDP_QUERY_ASSISTMETO : 0x00A40016,    // ,"CCDP-查询我协助的记录列表","CCDP"),
             CCDP_QUERY_ASSISTTOME : 0x00A40017,    // ,"CCDP-查询协助我的记录列表","CCDP"),
             CCDP_UPDATE_ASSISTREPORT : 0x00A40018,    // ,"CCDP-填写协助报告","CCDP"),
             CCDP_ADD_EVALUATE : 0x00A40019,    // ,"CCDP-评价","CCDP"),
             CCDP_QUERY_REASON : 0x00A4001A,    // ,"CCDP-查询原因列表","CCDP"),

             CCDP_QUERY_FILTERLIST : 0x00A4001B,    // ,"CCDP-筛选条件选项列表","CCDP"),
             CCDP_QUERY_MYFRIEND : 0x00A4001C,    // ,"CCDP-查询好友列表","CCDP"),
             CCDP_QUERY_CONTACTSFRIEND : 0x00A4001D,    // ,"CCDP-查询通讯录好友列表","CCDP"),
             CCDP_ADD_FRIEND : 0x00A4001E,    // ,"CCDP-添加好友","CCDP"),
             CCDP_ACCEPT_FRIEND : 0x00A4001F,    // ,"CCDP-接受好友","CCDP"),
             CCDP_DELETE_FRIEND : 0x00A40020,    // ,"CCDP-删除好友","CCDP"),
             CCDP_QUERY_GROUP : 0x00A40021,    // ,"CCDP-查找群列表","CCDP"),
             CCDP_ADD_GROUP : 0x00A40022,    // ,"CCDP-新建群组","CCDP"),
             CCDP_QUERY_GROUPINFO : 0x00A40023,    // ,"CCDP-查询群信息","CCDP"),
             CCDP_QUITORDELETE_GROUP : 0x00A40024,    // ,"CCDP-退出或解散群组","CCDP"),
             CCDP_UPDATE_GROUP : 0x00A40025, // "CCDP-更新群组", "CCDP"),
             CCDP_ADD_REPORTGROUP : 0x00A40026,    // ,"CCDP-添加举报群组","CCDP"),
             CCDP_QUERY_REPORTREASON : 0x00A40027,    // ,"CCDP-查询举报原因列表","CCDP"),
             CCDP_DELETE_ASSISTTOMERECORD : 0x00A40028,    // ,"CCDP-删除协助我的记录","CCDP"),
             CCDP_DELETE_ASSISTMETORECORD : 0x00A40029,    // ,"CCDP-删除我协助的记录","CCDP"),
             CCDP_QUERY_FRIENDRELATION : 0x00A4002A,    // ,"CCDP-查询好友关系列表","CCDP"),

             CCDP_PUSH_REQASSIST : 0x00A40030,    // ,"CCDP-推送请求远程协助信息","CCDP"),
             CCDP_PUSH_ACCEPTASSIST : 0x00A40031,    // ,"CCDP-推送接受远程协助信息","CCDP"),
             CCDP_PUSH_CONNECTID : 0x00A40032,    // ,"CCDP-推送设备连接ID","CCDP"),
             CCDP_PUSH_CONTROLCMD : 0x00A40033,    // ,"CCDP-推送控制命令信息","CCDP"),
             CCDP_PUSH_ENDASSIST : 0x00A40034,    // ,"CCDP-推送结束远程协助","CCDP"),
             CCDP_PUSH_DISMISSGROUPMSG : 0x00A40035,    // ,"CCDP-推送退出或解散群组消息","CCDP"),
             CCDP_PUSH_FRIENDRELATION : 0x00A40036,    // ,"CCDP-推送好友关系","CCDP"),
             CCDP_PUSH_USERSTATUS : 0x00A40037,   // "CCDP-用户状态推送", "CCDP"),
             CCDP_PUSH_BEKICKED : 0x00A40037 // 这个命令同   CCDP_PUSH_USERSTATUS   一样，是作为被踢下线的命令处理的

            /*CCDP_GET_FILES:0x00A40039,
            CCDP_SEND_FILES:0x00A4002B   //文件消息成功*/
        },
        app: {
            network : {
                linked : 0xC101,
                down : 0xC102
            },
            sendToolPage:0x0003,
            goBack : 0xC103,
            startRecord : 0x1001,
            stopRecord : 0x1002,
            playVoice : 0x2001,
            getContacts : 0xC010,
            switchPage : 0xC020,
            callChatFunction : 0xC030,
            takeImage: 0x4001,
            previewImage: 0x4002,
            CCDPBusinessVehicleDiagnosis: 0xB001,
            CCDPBusinessSecurityMatching: 0xB002,
            CCDPBusinessMaintenanceReset: 0xB003,
            CCDPBusinessModuleProgramming: 0xB004,
            CCDPBusinessEncodingSettings: 0xB005,
            CCDPBusinessSimulationTrial: 0xB006,
            CCDPBusinessWifiSetting: 0xB007,
            CCDPBusinessCheckDevConnect: 0xB008,
            CCDPBusinessSystemSetting:0xB012,
            getCCDPBusinessList: 0xC001,
            CCDPBusinessAPP2PC: 0xC009,
            settingNetCont: 0xB009,
            SettingDevCont: 0xB010,
            loadIndexPage : 0xB011,
            sendVehicleInformation:0x900F,
            sendPic:0x9003,
            sendFiles:0x900B,
            downFiles:0X900C
        }
    },
    what_pages: {
        vehicleDiagnosis: 0xA001,
        securityMatching: 0xA002,
        maintenanceReset: 0xA003,
        moduleProgramming: 0xA004,
        encodingSettings: 0xA005,
        simulationTrial: 0xA006,
        wifiSetting: 0xA007,
        checkDevConnect: 0xA008,
        systemSetting: 0xA011
    },
    what_fun4chat: {
        rmt_pc: 0xA001,
        rmt_phone: 0xA002,
        takeImage: 0xA003,
        video: 0xA004,
        voice: 0xA005
    },
    events: {
        pushPrefix: 'pushPrefix-!-!-!',
        yhAppCallJs: 'yhAppCallJs-!-!-!',
        onReceiveMessage: 'onReceiveMessage',
        connectionStatusChanged: 'connectionStatusChanged',
        onStateEnter: '-!-!-onEnter-!-!-',
        onStateExit: '-!-!-onExit-!-!-',
        onStateExitLogin: '-!-!-ExitLogin-!-!-',
        onStateIsLogin: '-!-!-isLogin-!-!-',
        refreshData: 'refreshData-!-!'
    },

    //imgUrlPrefix: 'http://192.168.13.196:8099/file/api-git/img.get?fn=',
    imgUrlPrefix: 'http://112.124.26.243:8099/file/api-git/img.get?fn=',

    questionState: {
        1: '未解决',
        2: '已解决',
        3: '已失效'
    },
    answersType: {
        1: '追问:',
        2: '追答:'
    },
    questionTypeState: {
        1: '追问：',
        2: '追答：',
        3: '感谢：',
        4: '采纳'
    },
    acceptStatus: {
        accept: 0,
        isAccept: 1
    },
    comprehensive: {
        question: 1,
        answers: 2,
        collection: 3
    },
    questionDetail: {
        supplementaryQuestions: '补充问题',
        ToAnswers: '我要回答'
    },
    evaluationState: {
        1: '未评价',
        2: '未评价',
        3: '未评价',
        4: '未评价',
        5: '已评价'
    },
    operationType: {
        generalAnswer: 0,
        ask: 1,
        chatAnswer: 2,
        thanks: 3,
        Adopt: 4
    },
    answerContent: {
        Adopt: '太给力了,您的回答完美的解决了我的问题,谢谢!',
        thanks: '谢谢您细致的解答,我的问题已解决'
    },
    filterType: {
        brand: 0,
        service: 1,
        expertLevel: 2,
        praise: 3,
        ranger: 4,
        online: 5
    },
    relation: {
        applied: 1,
        accepted: 2,
        removed: 3,
        refused: 4
    },
    rongCloud: {
        appKey: 'lmxuhwagxy2ed',
        ConversationType: {
            NONE: 0,
            PRIVATE: 1,
            DISCUSSION: 2,
            GROUP: 3,
            CHATROOM: 4,
            CUSTOMER_SERVICE: 5,
            SYSTEM: 6,
            APP_PUBLIC_SERVICE: 7,
            PUBLIC_SERVICE: 8
        }
    },

    //修改技师设置获取键值
    modifyTechnicianSetup: {
        userName: 1, //用户名
        userSex: 2,  //性别
        userIcon: 3, //头像
        userNickname: 4, //昵称
        userServiceBrand: 5,  //擅长处理
        userServiceTime: 6, //服务时间
        userRemark: 7, // 服务介绍
        userServiceProject: 8
    },

    // 區別遠程協助發送至App 是否為請求方 與其 接受方.
    differenceRemoteRequest: {
        initiator: 0,  //發起
        receivingParty: 1 //接受
    }
};
