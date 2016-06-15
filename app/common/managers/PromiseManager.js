/**
 * Created by tapes on 2015/9/6.
 */

var PromiseManager = function ($q, Constants) {

    var _increasedId = 1;
    var _promiseMap = {};

    return {
        request: request,
        response: response
    };

    function request(func) {
        var deferred = $q.defer();
        var promiseId = promiseId();

        _promiseMap[promiseId] = deferred;

        func(promiseId);

        return deferred.promise;
    }

    function response(promiseId, func) {
        var deferred = _promiseMap[promiseId];

        _promiseMap[promiseId] = null;

        func(deferred);
    }

    function promiseId() {

        if (_increasedId >= 0xFFFFFFFF) {
            _increasedId = 1;
        }

        return _increasedId++;
    }

};

PromiseManager.$inject = [
    '$q',
    'Constants'
];

module.exports = PromiseManager;