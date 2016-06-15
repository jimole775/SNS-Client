/**
 * Created by tapes on 2015/7/1.
 */

module.exports = angular.module('app.common', ['ab-base64','ngCookies'])

    // constants
    .constant('Constants', require('./constants'))

    //Ä£ÄâÊý¾Ý
   /* .constant('SimulatedData',require('./simulated-data'))
    .constant('homePageData',require('./homePageData'))*/
    //.constant('conversationData',require('./conversationData'))

    //

    // directives
    .directive('adjustBottomBy', require('./directives/adjustBottomBy'))
    .directive('changeBackgroundDiagnosis', require('./directives/changeBackgroundDiagnosis'))
    .directive('changeBackgroundProgramming', require('./directives/changeBackgroundProgramming.js'))
    .directive('changeBackgroundReset', require('./directives/changeBackgroundReset.js'))
    .directive('changeBackgroundEncodSet', require('./directives/changeBackgroundEncodSet.js'))
    .directive('changeBackgroundTrial', require('./directives/changeBackgroundTrial.js'))
    .directive('changeBackgroundSystemSetting', require('./directives/changeBackgroundSystemSetting.js'))
    .directive('isShowTabs', require('./directives/isShowTabs'))
    .directive('indexFontSize', require('./directives/indexFontSize.js'))
    .directive('indexList', require('./directives/indexList.js'))
    .directive('assiScrollHeight', require('./directives/assiScrollHeight.js'))
    .directive('chatMenu', require('./directives/chatMenu.js'))
    .directive('checkNickName', require('./directives/checkNickName'))
    .directive('hourDirective', require('./directives/hourDirective'))
    .directive('hoursDirective', require('./directives/hoursDirective'))
    .directive('minuteDirective', require('./directives/minuteDirective'))
    .directive('minutesDirective', require('./directives/minutesDirective'))
    .directive('startEndDirective', require('./directives/startEndDirective'))
    .directive('formTextFocus', require('./directives/formTextFocus'))
    .directive('homePage', require('./directives/homePage.js'))

    // filters
    .filter('prefixSrc', require('./filters/prefixSrc'))
    .filter('formatSecond', require('./filters/formatSecond'))
    .filter('searchUser', require('./filters/searchUser'))

    // managers
    .factory('PromiseManager', require('./managers/PromiseManager'))
    .factory('FriendRelationManager', require('./managers/FriendRelationManager'))

    // models

    // services
    .factory('JSTransport', require('./services/JSTransport.js'))
    .factory('JSCommand', require('./services/JSCommand.js'))
    .factory('JSCache', require('./services/JSCache.js'))
    .factory('JSUtils', require('./services/JSUtils'))
    .factory('JSMock', require('./services/JSMock.js'));