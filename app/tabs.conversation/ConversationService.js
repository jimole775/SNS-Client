/**
 * Created by Weidongjian on 2015/11/13.
 */
var ConversationService = function (Constants,
                                    BackendService) {

    var valueObj = {};
    return {
        setReceivingParameters : function (targetId,conversationType){
            valueObj.targetId = targetId;
            valueObj.conversationType = conversationType;
        },
        getReceivingParameters : function (){
            return valueObj;
        },
        requestAssistance: function (AssistanceId) {
            var data = [
                {
                    type: 'int',
                    value: AssistanceId
                }
            ];
            return BackendService.request({
                cmd: Constants.RPC_CMD.request.requestRemoteAssistance,
                data: data
            })
        },
        receiveRemoteAssistanceRequests: function (RecipientId) {
            var data = [
                {
                    type: 'int',
                    value: RecipientId
                }
            ];
            return BackendService.request({
                cmd: Constants.RPC_CMD.request.acceptRemoteAssistance,
                data: data
            })
        },
        refuseRemoteAssistance: function (rejectedPersonId) {
            var data = [
                {
                    type: 'int',
                    value: rejectedPersonId
                }
            ];
            return BackendService.request({
                cmd: Constants.RPC_CMD.request.refuseRemoteAssistance,
                data: data
            })
        },
        //Èº¾Ù±¨
        groupReportData:function(){
            var data=[];
            return BackendService.request({
                cmd: Constants.RPC_CMD.request.groupReportData,
                data: data
            })
        },
        groupReportRequest:function(groupId,reason,chatEvidence,picEvidence){
            var data=[
                {
                    type:'int',
                    value:groupId
                },
                {
                    type:'String',
                    value:reason
                },
                {
                    type:'String',
                    value:chatEvidence
                },
                {
                    type : 'String',
                    value: JSON.stringify(picEvidence)
                }
            ];
            return BackendService.request({
                cmd: Constants.RPC_CMD.request.groupReportRequest,
                data: data
            })
        },
        getVehicleInformation : function (brandId,carId){
            var data = [
                {
                    type:'int',
                    value:brandId
                },
                {
                    type:'int',
                    value:carId
                }
            ];
            return BackendService.request({
                cmd: Constants.RPC_CMD.request.vehicleInformation,
                data: data
            })
        },
        deleteFriend : function (friendId){
            var data = [
                {
                    type:'int',
                    value:friendId
                }
            ];

            return BackendService.request({
                cmd: Constants.RPC_CMD.request.deleteFriend,
                data: data
            })
        }

    }
};

ConversationService.$inject = [
    'Constants',
    'BackendService'
];
module.exports = ConversationService;