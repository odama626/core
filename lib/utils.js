'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const lock = () => {
    let scrollOffset = window.pageYOffset;
    let overflow = document.body.style.overflow;
    let position = document.body.style.position;
    let top = document.body.style.top;
    let width = document.body.style.width;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollOffset}px`;
    document.body.style.width = '100%';
    return function () {
        document.body.style.overflow = overflow;
        document.body.style.position = position;
        document.body.style.top = top;
        document.body.style.width = width;
        window.scrollTo(0, scrollOffset);
    };
};
const saveLocally = (key, data) => {
    let storage = window.localStorage;
    try {
        if (!storage)
            throw new Error('Local Storage not availabe');
        storage.setItem(key, JSON.stringify(data));
        return true;
    }
    catch (e) {
        console.error(e);
        return false;
    }
};
const loadLocally = (key) => {
    let storage = window.localStorage;
    if (!storage)
        return null;
    try {
        return JSON.parse(storage.getItem(key));
    }
    catch (e) {
        console.error(e);
        return null;
    }
};
const memoize = (fun, ...args) => {
    try {
        window.memoes = window.memoes || {};
        let key = JSON.stringify({ fun, args });
        if (!window.memoes[key]) {
            window.memoes[key] = fun(...args);
        }
        // console.log(fun.arguments);
        return window.memoes[key];
    }
    catch (e) {
        return fun(...args);
    }
};
function maybe(path, obj, other = undefined) {
    let p = typeof path === 'string' ? path.split('.') : path;
    return p.reduce((result, next) => result && result[next] !== 'undefined' ? result[next] : undefined, obj) || other;
}
function Maybe(obj, path, other = undefined) {
    return path ? maybe(path, obj, other) : function (path, other = undefined) {
        return maybe(path, obj, other);
    };
}
// let a = {
//   b: {
//     c : 'Here'
//   },
//   c: {
//     d: 'There'
//   }
// }
// let m = Maybe(a);
// m('b.c') //?
// m('c.d') //?
// m('b.c.d', 'Nope') //?
// Maybe(a)('b.c') //?
// Maybe(a)('c.d', 'Nope') //?
// Maybe(a)('b.c.d', 'Nope'); //?
// Maybe(a, 'b.c') //?
// Maybe(a, 'c.d', 'Nope') //?
// Maybe(a, 'b.c.d', 'Nope'); //?

exports.lock = lock;
exports.saveLocally = saveLocally;
exports.loadLocally = loadLocally;
exports.memoize = memoize;
exports.Maybe = Maybe;
