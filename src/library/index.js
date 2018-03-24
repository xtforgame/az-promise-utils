// http://stackoverflow.com/questions/20100245/how-can-i-execute-array-of-promises-in-sequential-order
/*

If you have an array of promise returning functions:

var tasks = [fn1, fn2, fn3...];

tasks.reduce(function(cur, next) {
    return cur.then(next);
}, RSVP.resolve()).then(function() {
    //all executed
});
Or values:

var idsToDelete = [1,2,3];

idsToDelete.reduce(function(cur, next) {
    return cur.then(function() {
        return http.post("/delete.php?id=" + next);
    });
}, RSVP.resolve()).then(function() {
    //all executed
});

*/

export { CancelToken } from './makeCancelable';
import makeCancelable from './makeCancelable';
export {
  makeCancelable,
}

export function defaultToPromiseFunc(_, value) {
  return Promise.resolve(value);
}

export function toSeqPromise(inArray, toPrmiseFunc = defaultToPromiseFunc) {
  return inArray.reduce((prev, curr, index, array) => prev.then(() => toPrmiseFunc(prev, curr, index, array)), Promise.resolve());
}

export function promiseWait(waitMillisec) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, waitMillisec);
  });
}