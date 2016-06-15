/**
 * Created by tapes on 2015/10/22.
 */

var formatSecond = function () {
    return function (input) {
        return Math.round(input / 1000);
    }
};

formatSecond.$inject = [];

module.exports = formatSecond;