'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeCancelable = exports.CancelToken = undefined;

var _makeCancelable = require('./makeCancelable');

Object.defineProperty(exports, 'CancelToken', {
  enumerable: true,
  get: function get() {
    return _makeCancelable.CancelToken;
  }
});
exports.defaultToPromiseFunc = defaultToPromiseFunc;
exports.toSeqPromise = toSeqPromise;
exports.promiseWait = promiseWait;

var _makeCancelable2 = _interopRequireDefault(_makeCancelable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.makeCancelable = _makeCancelable2.default;
function defaultToPromiseFunc(_, value) {
  return Promise.resolve(value);
}

function toSeqPromise(inArray) {
  var toPrmiseFunc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultToPromiseFunc;

  return inArray.reduce(function (prev, curr, index, array) {
    return prev.then(function () {
      return toPrmiseFunc(prev, curr, index, array);
    });
  }, Promise.resolve());
}

function promiseWait(waitMillisec) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, waitMillisec);
  });
}