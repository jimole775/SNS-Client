/**
 * Created by tapes on 2015/9/15.
 */

var prefixSrc = function (Constants) {
    return function (icon) {
        return Constants.imgUrlPrefix + (icon || 'avatar.jpg');
    }
};

prefixSrc.$inject = [
    'Constants'
];

module.exports = prefixSrc;