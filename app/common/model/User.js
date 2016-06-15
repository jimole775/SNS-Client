/**
 * Created by tapes on 2015/8/5.
 */

var _ = require('underscore');

var User = function (Constants) {


    function Constructor() {
        Constructor.prototype.initialize.apply(this, arguments);
    }

    angular.extend(Constructor.prototype, {

        initialize: function (attrs) {
            var self = this;

            _.each(attrs, function (value, key) {
                self[key] = value;
            });
        },

        isLogin : function(){
            return false;
        },

        isTechnician: function () {
            return this.role === Constants.role.technician;
        },

        isExpert: function () {
            return this.role === Constants.role.expert;
        },

        get: function (key) {
            return this[key];
        }

    });

    return Constructor;


};

Profile.$inject = [
    'Constants'
];

module.exports = Profile;