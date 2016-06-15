/**
 * Created by userName on 2016/1/13.
 */
module.exports = {
    encoding: 'utf-8',
    personHomeMessage: {
        what: 0x00A40020,
        status: 0x00,
        id: 13,
        nickName: "happily",
        sex: 2,
        grade: 1,
        icon: "avatar.jpg",
        resolveCount: "11",
        popularity: "11",
        gold: "11"
    },
    personData: {
        what: 0x00A40019,
        status: 0x00,
        id: 13,
        icon: "avatar.jpg",
        grade: 1,
        nickName: "happily",
        sex: 2,
        userName: 15296576299
    },
    expertSettingData: {
        what: 0x00A4001E,
        status: 0x00,
        id: 13,
        description: "擅长报废处理~",
        nickName: "happily",
        sex: 1,
        userName: "15296576299",
        serveEndTime: "08:00",
        serveStartTime: "00:00",
        professionalBrandList: [
            {
                icon: "masaladi.png",
                id: 1,
                name: "马萨拉蒂"
            },
            {
                icon: "BMW_png.png",
                id: 2,
                name: "宝马"
            }
        ],
        professionalProjectList: [
            {
                id: 4,
                serveName: "发动机维修"
            },
            {
                id: 5,
                serveName: "报废"
            }
        ]
    },
    filtBrandList:{
        what:0x00A40039,
        status: 0x00,
        type:0,
        itemList:[
            {
                icon_ur: "masaladi.png",
                id: 1,
                initial: "M",
                name: "马萨拉蒂",
                isChecked:true
            },
            {
                icon_ur: "BMW_png.png",
                id: 2,
                initial: "B",
                name: "宝马",
                isChecked:true
            },
            {
                icon_ur: "nissan_png.png",
                id: 3,
                initial: "R",
                name: "日产"
            },
            {
                icon_ur: "jh.png",
                id: 4,
                initial: "J",
                name: "江淮"
            }
        ]
},
    filtServiceList:{
        what:0x00A40039,
        status: 0x00,
        type:1,
        itemList:[
            {
                id: 1,
                name: "冷却系统维修"
            },
            {
                id: 2,
                name: "电路维修"
            },
            {
                id: 3,
                name: "油路维修"
            },
            {
                id: 4,
                isChecked: true,
                name: "发动机维修"
            },
            {
                id: 5,
                isChecked: true,
                name: "报废"
            }
        ]

    },
    assistList:{
        what:0x00A40017,
        status: 0x00,
        helpMe:[
            {
                fromId:95,
                id:1,
                toId:13,
                startTime:"2015-11-27",
                endTime:"2015-11-27",
                updateTime:"2015-11-27",
                user:{
                    id:95,
                    nickName:"anickname95",
                    userName:"15507895501"
                }
            },
            {
                fromId:96,
                id:2,
                toId:13,
                startTime:"2015-11-27",
                endTime:"2015-11-27",
                updateTime:"2015-11-27",
                user:{
                    id:96,
                    nickName:"anickname96",
                    userName:"15507895502"
                }
            }
        ]
    },
    toAssistList:{
        what:0x00A40016,
        status: 0x00,
        toHelpMe:[
            {
                fromId:04,
                id:1,
                toId:13,
                startTime:"2015-11-27",
                endTime:"2015-11-27",
                updateTime:"2015-11-27",
                user:{
                    id:95,
                    nickName:"anickname04",
                    userName:"15507895501"
                }
            },
            {
                fromId:05,
                id:2,
                toId:13,
                startTime:"2015-11-27",
                endTime:"2015-11-27",
                updateTime:"2015-11-27",
                user:{
                    id:96,
                    nickName:"anickname05",
                    userName:"15507895502"
                }
            }
        ]
    }

};