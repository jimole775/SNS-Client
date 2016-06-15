/**
 * Created by tapes on 2015/10/30.
 */

var _ = require('underscore');

module.exports = function () {
    // 比较fiter
    return function (input, args) {

        var filterArr = [];
        _.forEach(input, function (categoryInAlpha) {

            var nPos = comPare(args, categoryInAlpha.nickName);
            if (nPos >= 0) {
                filterArr.push(categoryInAlpha);
            }
            if (categoryInAlpha.contactName) {
                var cNamePos = comPare(args, categoryInAlpha.contactName);
                if (cNamePos >= 0 && cNamePos != nPos) {
                    filterArr.push(categoryInAlpha);
                }
            }
            if (categoryInAlpha.phoneNumber) {
                var pNumberPos = comPare(args, categoryInAlpha.phoneNumber);
                if (pNumberPos >= 0 && (pNumberPos != nPos && pNumberPos != cNamePos )) {
                    filterArr.push(categoryInAlpha);
                }
            }
        });
        return filterArr;
    };

    function comPare(sFind, sObj) {
        var nSize = sFind.length;
        var nLen = sObj.length;
        var sCompare;

        if (nSize <= nLen) {
            for (var i = 0; i <= nLen - nSize + 1; i++) {
                sCompare = sObj.substring(i, i + nSize);
                if (sCompare == sFind) {
                    return i;
                }
            }
        }
        return -1;
    }
};