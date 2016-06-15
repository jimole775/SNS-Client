/**
 * Created by tapes on 2015/9/15.
 */

var _ = require('underscore');

var FriendRelationManager = function ($rootScope) {

    var prefix = '!!-FriendRelation-!!';

    $rootScope.__userList__ = [];

    function getKey() {
        //var currentUser = UCenterService.getProfile();
        //
        //var currentUserId = currentUser.id;
        //
        //return prefix + currentUserId;
    }

    return {

        loadUserListFromLocalStorage: function () {
            //var userListStr = localStorage.getItem(getKey());
            //var __userList__ = JSON.parse(userListStr) || [];
            //
            //// 插入
            //Array.prototype.splice.apply($rootScope.__userList__, [$rootScope.__userList__.length, 0].concat(__userList__));
            //console.log('loadUserListFromLocalStorage');
            //
            //$rootScope.$watch('__userList__', function (__userList__) {
            //    console.log('同步 FriendRelation', __userList__);
            //
            //    var userListStr = JSON.stringify(__userList__);
            //
            //    localStorage.setItem(getKey(), userListStr);
            //}, true);
        },

        refresh: function (newUser) {
            //if (newUser.relation === Constants.relation.removed) {
            //    this.removeUser(newUser.id);
            //} else {
            //    var user = this.getUser(newUser.id);
            //
            //    if (user) {
            //        this.updateUser(newUser);
            //    } else {
            //        $rootScope.__userList__.unshift(newUser);
            //    }
            //}

        },

        onRefresh: function (cb) {
            return $rootScope.$watch('__userList__', cb, true);
        },

        getUserList: function () {


            return $rootScope.__userList__;
        },

        getUser: function (id) {
            return _.findWhere($rootScope.__userList__, {
                id: id
            });
        },

        updateUser: function (newUser) {
            //var user = this.getUser(newUser.id);
            //
            //if (user) {
            //    _.extend(user, newUser);
            //}

        },

        refused : function(id){
            //var user = _.findWhere($rootScope.__userList__, {
            //    id: id
            //});
            //
            //if(user){
            //    user.relation =Constants.relation.refused;
            //}
            //
            //console.log('$rootScope.__userList__',$rootScope.__userList__);
        },

        removeUser: function (id) {
            //var user = this.getUser(id);
            //var index;
            //
            //if (user) {
            //    index = $rootScope.__userList__.indexOf(user);
            //    $rootScope.__userList__.splice(index, 1);
            //}

        }
    };
};

FriendRelationManager.$inject = [
    '$rootScope',
    'Constants',
    'JSCache'

];

module.exports = FriendRelationManager;