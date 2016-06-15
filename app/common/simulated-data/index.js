/**
 * Created by Weidongjian on 2016/1/13.
 */
module.exports = {
    encoding: 'utf-8',
    userListMessage: {
        what: 0x00A4001C,
        status: 0x00,
        userList: [
            {
                "id": 1,
                "userName": 15577779999,
                'nickName': '昵称',
                'icon': 'asdfafadf',
                'grade': 2,
                'initial': 'A'
            },
            {
                "id": 2,
                "userName": 15577779998,
                'nickName': '黄琛',
                'icon': 'asdfafadf',
                'grade': 1,
                'initial': 'H'
            }
        ]
    },
    findTechnicianMessage: {
        what: 0x00A40038,
        status: 0x00,
        userList: [
            {
                "id": 1,
                "userName": 15577779999,
                'nickName': '昵称',
                'icon': 'asdfafadf',
                'grade': 2,
                'initial': 'A'
            },
            {
                "id": 2,
                "userName": 15577779999,
                'nickName': '黄琛',
                'icon': 'asdfafadf',
                'grade': 1,
                'initial': 'H'
            },
            {
                "id": 3,
                "userName": 15577779999,
                'nickName': '西方失败',
                'icon': 'asdfafadf',
                'grade': 3,
                'initial': 'x'
            }
        ]
    },
    findFilterBrandMessage: {
        what: 0x00A40039,
        status: 0x00,
        type: 0,
        itemList: [
            {
                'id': 1,
                'name': '宝马',
                'icon': 'xxxx',
                'initial': 'B'
            },
            {
                'id': 2,
                'name': '奔驰',
                'icon': 'xxxx',
                'initial': 'B'
            },
            {
                'id': 3,
                'name': '法拉利',
                'icon': 'xxxx',
                'initial': 'F'
            }
        ]
    },
    findFilterServiceMessage: {
        what: 0x00A40039,
        status: 0x00,
        type: 1,
        itemList: [
            {
                'id': 1,
                'name': '发动机维修'
            },
            {
                'id': 2,
                'name': '冷却系统维修',
                'icon': 'xxxx'
            },
            {
                'id': 3,
                'name': '变速器维修'
            },
            {
                'id': 4,
                'name': '刹车系统维修'
            }
        ]
    },
    findFilterExpertLevelMessage: {
        what: 0x00A40039,
        status: 0x00,
        type: 2,
        itemList: [
            {
                'id': 1,
                'name': '一级技师'
            },
            {
                'id': 2,
                'name': '二级技师'
            },
            {
                'id': 3,
                'name': '三级技师'
            },
            {
                'id': 4,
                'name': '四级技师'
            }
        ]
    },
    getGroupListData: {
        what: 0x00A4003F,
        status: 0x00,
        groupList: [
            {
                'id': 1,
                'name': '群123',
                'icon': 'abc.def',
                'isAllowStranger': 0,
                'isAllowSearch': 0,
                'members': [
                    {
                        "groupId": 2,
                        "icon": "08_avatar_middle.jpg",
                        "id": 6,
                        "nickName": "萌萌",
                        "userId": 13,
                        "userName": "13878116674"
                    },
                    {
                        "groupId": 2,
                        "icon": "84_avatar_middle.jpg",
                        "id": 7,
                        "nickName": "tyutyu",
                        "userId": 1063,
                        "userName": "13738108163"
                    }
                ]
            },
            {
                'id': 2,
                'name': '群456',
                'icon': 'abc.def',
                'isAllowStranger': 0,
                'isAllowSearch': 1,
                'members': [
                    {
                        "groupId": 2,
                        "icon": "08_avatar_middle.jpg",
                        "id": 6,
                        "nickName": "萌萌",
                        "userId": 13,
                        "userName": "13878116674"
                    },
                    {
                        "groupId": 2,
                        "icon": "84_avatar_middle.jpg",
                        "id": 7,
                        "nickName": "tyutyu",
                        "userId": 1063,
                        "userName": "13738108163"
                    }
                ]
            }
        ]
    },
    createGroup: {
        what: 0x00A40040,
        status: 0x00,
        id: 1,
        groupName: '群名稱'
    },
    relationList: {
        what: 0x00A40057,
        status: 0x00,
        userList: [
            {
                'id': 1,
                "userName": 15577779999,
                'nickName': '昵称',
                'icon': 'asdfafadf',
                'grade': 2,
                'initial': '',
                'relation': 1,
                'initiator': 2
            },
            {
                'id': 2,
                "userName": 15577779997,
                'nickName': 'ha楼',
                'icon': 'asdfafadf',
                'grade': 2,
                'initial': 'A',
                'relation': 2,
                'initiator': 4
            },
            {
                'id': 3,
                "userName": 15577779998,
                'nickName': '大饼',
                'icon': 'asdfafadf',
                'grade': 2,
                'initial': 'D',
                'relation': 1,
                'initiator': 1
            },
            {
                'id': 4,
                "userName": 15577779998,
                'nickName': '真的爱你',
                'icon': 'asdfafadf',
                'grade': 3,
                'initial': 3
            }
        ]
    },
    applyFriend: {
        what: 0x00A4003B,
        status: 0x00,
        user: {
            'id': 4,
            "userName": 15577779997,
            'nickName': 'ha楼',
            'icon': 'asdfafa3',
            'grade': 2,
            'initial': 'H',
            'relation': 1,
            'initiator': 3
        }
    },
    acceptFriend: {
        what: 0x00A4003C,
        status: 0x00,
        user: {
            'id': 1,
            "userName": 15577779997,
            'nickName': 'ha楼',
            'icon': 'asdfafa3',
            'grade': 2,
            'initial': 'H',
            'relation': 2,
            'initiator': 3
        }

    },

    removeApplyFriendToServer : {
        what: 0x00A4003D,
        status: 0x00,
        userList: [
            {
                'id': 2,
                "userName": 15577779997,
                'nickName': 'ha楼',
                'icon': 'asdfafadf',
                'grade': 2,
                'initial': 'A',
                'relation': 2,
                'initiator': 4
            },
            {
                'id': 3,
                "userName": 15577779998,
                'nickName': '大饼',
                'icon': 'asdfafadf',
                'grade': 2,
                'initial': 'D',
                'relation': 1,
                'initiator': 1
            },
            {
                'id': 4,
                "userName": 15577779998,
                'nickName': '真的爱你',
                'icon': 'asdfafadf',
                'grade': 3,
                'initial': 3
            }
        ]
    },

    removeApplyFriendToAppCache :{
        what: 0x00A40059,
        status: 0x00,
        userList: [
            {
                'id': 2,
                "userName": 15577779997,
                'nickName': 'ha楼',
                'icon': 'asdfafadf',
                'grade': 2,
                'initial': 'A',
                'relation': 2,
                'initiator': 4
            },
            {
                'id': 3,
                "userName": 15577779998,
                'nickName': '大饼',
                'icon': 'asdfafadf',
                'grade': 2,
                'initial': 'D',
                'relation': 1,
                'initiator': 1
            },
            {
                'id': 4,
                "userName": 15577779998,
                'nickName': '真的爱你',
                'icon': 'asdfafadf',
                'grade': 3,
                'initial': 3
            }
        ]
    },

    getContacts:  {
        what:0xC010,
        status:0x00,
        userList:[
            {
                "id": 1,
                "userName": 15577779999,
                'nickName': '昵称',
                'icon': 'asdfafadf',
                'grade': 2,
                'initial': 'D',
                'relation': 2,
                'initiator': 3,
                'contactName':'大表哥'
            },
            {
                "id": 4,
                "userName": 15577779990,
                'nickName': 'hello World',
                'icon': 'asdfafadf',
                'grade': 2,
                'initial': 'N',
                'contactName':'小城大事',
                'initiator': 3

            },
            {
                "id": 2,
                "userName": 15577779990,
                'nickName': '',
                'icon': 'asdfafadf',
                'grade': 2,
                'initial': 'S',
                'isRegister': true,
                'contactName':'史泰龙',
                'initiator': 3,
                'relation':0
            }

        ]
    },

    inviteFriend : {
        what: 0x00A40060,
        status: 0x01,
        reason : '发送邀请短信失败'
    }
    ,

    userDetail: {
        what:0x00A40004,
        status:0x00,
        user:{
            "description":null,
            "gold":0,
            "grade":1,
            "icon":"84_avatar_middle.jpg",
            "id":3322,
            "initial":"#",
            "popularity":21,
            "nickName":"皇城",
            "professionalBrandList":[
                {
                    "brand":"马萨拉蒂",
                    "brandid":1,
                    "createtime":1449379031000,
                    "desc_c":"奥迪",
                    "icon_ur":"masaladi.png",
                    "initial":"M",
                    "updatetime":1419581463000
                },
                {
                    "brand":"宝马",
                    "brandid":2,
                    "createtime":1448961840000,
                    "desc_c":"宝马",
                    "icon_ur":"BMW_png.png",
                    "initial":"B",
                    "updatetime":1419581467000
                }
            ],
            "professionalProjectList":[
                {
                    "classId":2,
                    "description":"服务描述3",
                    "id":3,
                    "serveName":"油路维修"
                },
                {
                    "classId":2,
                    "description":"服务描述4",
                    "id":4,
                    "serveName":"发动机维修"
                },
            ],
            "relation":2,
            "resolvedCount":0,
            "serveEndTime":null,
            "serveStartTime":"11:36",
            "sex":2,
            "skilledList":[
                {
                    "brandId":1,
                    "description":"描述1",
                    "id":1,
                    "skilledName":"技能1",
                    "stype":1
                },
                {
                    "brandId":2,
                    "description":"描述2",
                    "id":2,
                    "skilledName":"技能2",
                    "stype":1
                }
            ],
            "userName":"13737725203"
        }

    }

};