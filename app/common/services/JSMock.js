/**
 * Created by Administrator on 2016/1/11.
 *
 * This service is used to mock some result
 */

var JSMock = function (Constants) {
    if (window.navigator.platform === 'Win32') {
        return {

            rpc: {
                login: function () {
                    var message = {};
                    message["what"] = Constants.YHWhat.rpc.login;
                    message["status"] = Constants.status.success;
                    message["token"] = "fdfefe";
                    message["userName"] = "userName";
                    message["token"] = "fdfefe";
                    var sMessage = JSON.stringify(message);
                    window.YHJavascript.sendToJS(sMessage);
                },
                sendVerificationCode: function () {
                    var message = {};
                    message["what"] = Constants.YHWhat.rpc.sendVerificationCode;
                    message["status"] = Constants.status.success;
                    var sMessage = JSON.stringify(message);
                    window.YHJavascript.sendToJS(sMessage);
                },
                logout: function () {
                    var message = {};
                    message["what"] = Constants.YHWhat.rpc.logout;
                    message["status"] = Constants.status.success;
                    var sMessage = JSON.stringify(message);
                    window.YHJavascript.sendToJS(sMessage);
                },

                Circle: {
                    getUserList: function () {
                        var message = SimulatedData.userListMessage;
                        var sMessage = JSON.stringify(message);
                        window.YHJavascript.sendToJS(sMessage);
                    },
                    getUserDetail: function () {
                        var message = SimulatedData.userDetail;
                        var sMessage = JSON.stringify(message);
                        window.YHJavascript.sendToJS(sMessage);
                    },
                    searchResult: function () {
                        var message = SimulatedData.findTechnicianMessage;
                        var sMessage = JSON.stringify(message);
                        window.YHJavascript.sendToJS(sMessage)
                    },
                    getFiltrationCondition: function (type) {
                        if (type === Constants.filterType.brand) {
                            var message = SimulatedData.findFilterBrandMessage;
                        }
                        else if (type === Constants.filterType.service) {
                            var message = SimulatedData.findFilterServiceMessage;
                        }
                        else if (type === Constants.filterType.expertLevel) {
                            var message = SimulatedData.findFilterExpertLevelMessage;
                        }
                        var sMessage = JSON.stringify(message);
                        window.YHJavascript.sendToJS(sMessage)
                    },
                    getGroupList: function () {
                        var message = SimulatedData.getGroupListData;
                        var sMessage = JSON.stringify(message);
                        window.YHJavascript.sendToJS(sMessage)
                    },
                    createOrRefreshGroup: function () {

                        var message = SimulatedData.getGroupListData;
                        var sMessage = JSON.stringify(message);
                        window.YHJavascript.sendToJS(sMessage)
                    },
                    getRelationList: function () {

                        var message = SimulatedData.relationList;
                        var sMessage = JSON.stringify(message);
                        window.YHJavascript.sendToJS(sMessage);
                    },
                    applyFriend: function () {
                        var message = SimulatedData.applyFriend;
                        var sMessage = JSON.stringify(message);
                        window.YHJavascript.sendToJS(sMessage);
                    },
                    acceptFriend: function () {
                        var message = SimulatedData.acceptFriend;
                        var sMessage = JSON.stringify(message);
                        window.YHJavascript.sendToJS(sMessage);
                    },
                    removeApplyFriendToServer: function () {
                        var message = SimulatedData.removeApplyFriendToServer;
                        var sMessage = JSON.stringify(message);
                        window.YHJavascript.sendToJS(sMessage);
                    },
                    removeApplyFriendToAppCache: function () {
                        var message = SimulatedData.removeApplyFriendToAppCache;
                        var sMessage = JSON.stringify(message);
                        window.YHJavascript.sendToJS(sMessage);
                    },
                    inviteFriend: function () {
                        var message = SimulatedData.inviteFriend;
                        var sMessage = JSON.stringify(message);
                        window.YHJavascript.sendToJS(sMessage);
                    }
                },
                Homepage: {
                    //����������ҳ
                    getPersonHomeData: function () {
                        var message = homePageData.personHomeMessage;
                        var sMessage = JSON.stringify(message);
                        window.YHJavascript.sendToJS(sMessage);
                    },
                    //��������
                    getPersonData: function () {
                        var message = homePageData.personData;
                        var sMessage = JSON.stringify(message);
                        window.YHJavascript.sendToJS(sMessage);
                    },
                    //�޸ĸ���������Ϣ����ӿ�
                    modifySex: function () {
                        var message = {};
                        message["what"] = Constants.YHWhat.rpc.modifyPersonData;
                        message["status"] = Constants.status.success;
                        var sMessage = JSON.stringify(message);
                        window.YHJavascript.sendToJS(sMessage);
                    },
                    //��������--ʵ����������ӿ�
                    realNameData: function () {
                        var message = {};
                        message["what"] = Constants.YHWhat.rpc.realNameData;
                        message["status"] = Constants.status.success;
                        message["success"] = "success";
                        var sMessage = JSON.stringify(message);
                        window.YHJavascript.sendToJS(sMessage);
                    },
                    //��������--��������
                    getExpertSettingData: function () {
                        var message = homePageData.expertSettingData;
                        var sMessage = JSON.stringify(message);
                        window.YHJavascript.sendToJS(sMessage);
                    },
                    //��ʦ����--�ӿ�����
                    getFiltrationCondition: function (type) {
                        var message;
                        if (type == Constants.filterType.brand) {

                            message = homePageData.filtBrandList;

                        } else if (type == Constants.filterType.service) {

                            message = homePageData.filtServiceList;

                        }
                        var sMessage = JSON.stringify(message);
                        window.YHJavascript.sendToJS(sMessage);

                    },
                    //��ѯЭ���ҵ�
                    getAssistTheRecordIsHelped: function () {
                        var message = homePageData.assistList;
                        var sMessage = JSON.stringify(message);
                        window.YHJavascript.sendToJS(sMessage);
                    },
                    //��ѯ��Э����
                    getAssistTheRecordHelped: function () {
                        var message = homePageData.toAssistList;
                        var sMessage = JSON.stringify(message);
                        window.YHJavascript.sendToJS(sMessage);
                    }

                },
                Conversation: {
                    getEditGroupChatList: function () {
                        var message = conversationData.getEditGroupChatList;
                        var sMessage = JSON.stringify(message);
                        window.YHJavascript.sendToJS(sMessage);
                    },
                    createOrRefreshGroup: function () {
                        var message = conversationData.createOrRefreshGroup;
                        var sMessage = JSON.stringify(message);
                        window.YHJavascript.sendToJS(sMessage);
                    },
                    getGroupReportData: function () {
                        var message = conversationData.getGroupReportData;
                        var sMessage = JSON.stringify(message);
                        window.YHJavascript.sendToJS(sMessage);
                    }
                }
            },
            rongcloud: {
                Conversation: {
                    getConversationList: function () {
                        var message = conversationData.getConversationList;
                        var sMessage = JSON.stringify(message);
                        window.YHJavascript.sendToJS(sMessage);
                    },
                    getConversation: function () {
                        var message = conversationData.getConversation;
                        var sMessage = JSON.stringify(message);
                        window.YHJavascript.sendToJS(sMessage);
                    }
                }
            },
            app: {
                getContacts: function () {
                    var message = SimulatedData.getContacts;
                    var sMessage = JSON.stringify(message);
                    window.YHJavascript.sendToJS(sMessage);
                },
                loadIndexPage : function(){
                    var msg = {};
                    msg["what"] = Constants.YHWhat.app.loadIndexPage;
                    msg["data"] = '';
                    var sMessage = JSON.stringify(message);
                    window.YHAndroidToJs.sendToJS(sMessage);
                }
            }

        }
    } else {
        return {};
    }
};

JSMock.$inject = [
    'Constants'
];

module.exports = JSMock;

