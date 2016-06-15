/**
 * Created by Weidongjian on 2016/1/13.
 */
module.exports = {
    encoding: 'utf-8',
    getConversationList: {
        what: 0xA004,
        status: 0x00,
        conversationList: [
            {
                "conversationTitle": "",
                "conversationType": "PRIVATE",
                "nickName": "11",
                "isTop": true,
                "latestMessage": "8888",
                "latestMessageId": 1,
                "receivedStatus": {
                    "flag": 0,
                    "isDownload": false,
                    "isListened": false,
                    "isRead": false
                },
                "receivedTime": "21:12",
                "senderUserId": "3320",
                "sentStatus": "SENT",
                "sentTime": 1452737577384,
                "targetId": "3324",
                "unreadMessageCount": 1,
                "objectName": "RC:TxtMsg"
            },
            {
                "conversationTitle": "",
                "conversationType": "GROUP",
                "name": "666",
                "isTop": false,
                "latestMessage": "wo",
                "latestMessageId": 1,
                "receivedStatus": {
                    "flag": 0,
                    "isDownload": false,
                    "isListened": false,
                    "isRead": false
                },
                "receivedTime": "16:12",
                "senderUserId": "3320",
                "sentStatus": "SENT",
                "sentTime": 1452737577384,
                "targetId": "10086",
                "unreadMessageCount": 0,
                "objectName": "RC:TxtMsg"
            },
            {
                "conversationTitle": "",
                "conversationType": "PRIVATE",
                "nickName": "22",
                "isTop": false,
                "latestMessage": "6666",
                "latestMessageId": 1,
                "receivedStatus": {
                    "flag": 0,
                    "isDownload": false,
                    "isListened": false,
                    "isRead": false
                },
                "receivedTime": "10:08",
                "senderUserId": "3320",
                "sentStatus": "SENT",
                "sentTime": 1452737577384,
                "targetId": "3324",
                "unreadMessageCount": 0,
                "objectName": "RC:TxtMsg"
            }
        ]
    },
    getGroupList: {
        what: 0x00A4003F,
        status: 0x00,
        groupList: [
            {
                id: 10086,
                conversationType: 'GROUP',
                icon: '84_avatar_middle.jpg',
                name: '12345'
            },
            {
                id: 1024,
                conversationType: 'GROUP',
                icon: '84_avatar_middle.jpg',
                name: '1024'
            }
        ]
    },
    getEditGroupChatList: {
        what: 0x00A40042,
        status: 0x00,
        id: 10086,
        conversationType: 'GROUP',
        icon: '84_avatar_middle.jpg',
        name: '12345',
        isAllowStrangerBoolean: true,
        isAllowSearchBoolean: true,
        isNoDisturbBoolean: true,
        members: [
            {
                id: 3324,
                nickName: '111'
            },
            {
                id: 3322,
                nickName: '2222'
            }
        ]
    },
    createOrRefreshGroup: {
        what: 0x00A40042,
        status: 0x00,
        id: 10086,
        conversationType: 'GROUP',
        icon: '84_avatar_middle.jpg',
        name: '12345',
        isAllowStrangerBoolean: true,
        isAllowSearchBoolean: true,
        isNoDisturbBoolean: true,
        member: [
            {
                id: 3324,
                icon: '84_avatar_middle.jpg',
                nickName: '44'
            },
            {
                id: 3322,
                icon: '84_avatar_middle.jpg',
                nickName: '66'
            }
        ]
    },
    getGroupReportData: {
        what: 0x00A4004A,
        status: 0x00,
        reason: [
            {
                reportedId: 1,
                reportReason: '2222'
            },
            {
                reportedId: 2,
                reportReason: '44'
            },
            {
                reportedId: 3,
                reportReason: '8'
            },
            {
                reportedId: 4,
                reportReason: '1'
            },
            {
                reportedId: 5,
                reportReason: '35'
            },
            {
                reportedId: 6,
                reportReason: '9'
            }
        ]
    },
    getConversation: {
        what: 0xA003,
        status: 0x00,
        targetId: 3324,
        messageList: [
            {
                objectName: 'RC:TxtMsg',
                messageDirection: 'SEND',
                content: [
                    {
                        content: 'liang'
                    }
                ]
            }
        ]
    },
    getUserDetail: {
        user: {
            description: "电路维修~~~~~",
            icon: "84_avatar_middle.jpg",
            id: 3324,
            nickName: "测试机器码1",
            relation: 2,
            userName: "13737725205"
        }


    }
}
;