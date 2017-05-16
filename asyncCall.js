/**
 * Created by cuyu on 5/5/17.
 */

// ---------------------Promise---------------------
function promisePrint(str) {
    console.log(str);
    return new Promise(function (resolve, reject) {
        //当异步代码执行成功时，我们才会调用resolve(...), 当异步代码失败时就会调用reject(...)
        //在本例中，我们使用setTimeout(...)来模拟异步代码，实际编码时可能是XHR请求或是HTML5的一些API方法.
        setTimeout(function () {
            resolve();
        }, 1000);
    });
}

promisePrint('111').then(
    () => promisePrint('222')
).then(
    () => promisePrint('333')
).then(
    () => promisePrint('444')
);


// ---------------------Generator---------------------
function co(genFun) {
    // 通过调用生成器函数得到一个生成器
    var gen = genFun();
    return function (fn) {
        next();
        function next(err, res) {
            if (err) return fn(err);
            // 将res传给next，作为上一个yield的返回值
            var ret = gen.next(res);
            // 如果函数还没迭代玩，就继续迭代
            if (!ret.done) return ret.value(next);
            // 返回函数最后的值
            fn && fn(null, res);
        }
    }
}


function printAsync(username, callback) {
    console.log(username);
    if (callback) setTimeout(callback, 1000);
}

printAsync('aaa', function () {
    printAsync('bbb', function () {
        printAsync('ccc', function () {
            printAsync('ddd');
        })
    })
});


function print(username) {
    return function fn(callback) {
        console.log(username);
        setTimeout(callback, 1000);
    }
}


// print('Li')(function () {
//     console.log('hi')
// }, 1000);

function* gen() {
    yield print('aaa');
    yield print('bbb');
    yield print('ccc');
    yield print('ddd');
}

function fetchGreetings(account) {
    console.log(`Greetings!${account}`);
    return account + 'fetch';
}

let func = co(gen);
func();


function generatorCall(genFunc) {
    let generator = genFunc();
    next();
    function next() {
        let ret = generator.next();
        // 如果函数还没迭代完，就继续迭代，并且将next函数本身作为回调函数输入到目标函数中
        // 在这里的print函数中，就是1秒之后会再度调用next函数
        if (!ret.done) return ret.value(next);
    }
}

generatorCall(gen);


// ---------------------async/await---------------------
function timeoutPrint(str) {
    console.log(str);
    return new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
}

function haha() {
    setTimeout(() => {
        console.log('haha');
    }, 1000);
}

async function asyncCall() {
    await timeoutPrint('aaa');
    await timeoutPrint('bbb');
    await timeoutPrint('ccc');
    await timeoutPrint('ddd');
    await haha();  // Only functions return Promise object will be 'waited'
    await haha();
}

asyncCall().then();


// ---------------------Observable---------------------
const Rx = require('rx');

function observablePrint(str) {
    return Rx.Observable.create(function (observer) {
        console.log(str);
        setTimeout(function () {
            observer.onNext();
            observer.onCompleted();
            observer.onError();
        }, 1000);
        return function () {
        }
    });
}

observablePrint('ob1').flatMap(observablePrint('ob2')).flatMap(observablePrint('ob3')).flatMap(observablePrint('ob4')).subscribe();

// subscription.dispose();

