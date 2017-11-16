setTimeout(function () {
    console.log('setTimeout');  // Will be called after all other promises (at the same time) resolved
}, 0);

var p3 = new Promise(function (resolve, reject) {
    resolve("B");
});

var p1 = new Promise(function (resolve, reject) {
    resolve(p3);
});

var p2 = new Promise(function (resolve, reject) {
    resolve("A");
});

p1.then(function (v) {
    console.log(v);
});

p2.then(function (v) {
    console.log(v);
}, function (v) {
    console.log(v);
});

// A B  <-- not  B A  as you might expect

// =====================
// a utility for timing out a Promise
function timeoutPromise(delay) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            reject("Timeout!");
        }, delay);
    });
}

function foo() {
    console.log('foo')
}

// setup a timeout for `foo()`
Promise.race([
    foo(),					// attempt `foo()`
    timeoutPromise(3000)	// give it 3 seconds
]).then(
    function () {
        // `foo(..)` fulfilled in time!
    },
    function (err) {
        // either `foo()` rejected, or it just
        // didn't finish in time, so inspect
        // `err` to know which
    }
);

// =====================
var p4 = new Promise(function (resolve, reject) {
    resolve("D");
    console.log("E");
    reject("F");  // ignored cause p4 already has resolve status
    console.log("G");
});

p4.then(function (v) {
    console.log(v);
});
// E G D

// ======================
var p5 = new Promise(function (resolve, reject) {
    f.bar();	// `f` is not defined, so error!
    resolve("p5 resolved");	// never gets here :(
    console.log('---p5---')  // never gets here either :(
});

p5.then(
    function fulfilled(v) {
        // never gets here :(
        console.log(v);
    },
    function rejected(err) {
        // `err` will be a `ReferenceError` exception object
        // from the `foo.bar()` line.
        console.log("Got error:");
        console.log(err);
    }
);

// ======================
var p6 = new Promise(function (resolve, reject) {
    resolve("p6 resolved");
    f.bar();	// `f` is not defined, but the promise is resolved and its status will not change. So the error is ignored!
    console.log('---p6---')  // statements below exception will not be called :(
});

p6.then(
    function fulfilled(v) {
        console.log(v);
    },
    function rejected(err) {
        console.log("Got error:");
        console.log(err);
    }
);

// ======================
var p7 = new Promise(function (resolve, reject) {
    resolve("p7 resolved");
});

p7.then(
    function fulfilled(msg) {
        f.bar();  // Error occurred! So this promise (not p7) get "reject" status, however we did not set reject callback for this promise
        console.log(msg);	// never gets here :(
    },
    function rejected(err) {
        // never gets here as p7 is resolved
    }
);

// =======================
var p8 = Promise.resolve(42);

var p9 = Promise.resolve(p8);

console.log(p8 === p9); // true

// =======================
var p10 = {
    then: function (cb, errcb) {
        cb(42);
        errcb("evil laugh");
    }
};

p10.then(
    function fulfilled(val) {
        console.log(val); // 42
    },
    function rejected(err) {
        // oops, shouldn't have run
        console.log(err); // evil laugh
    }
);

Promise.resolve(p10).then(
    function fulfilled(val) {
        console.log(val); // 42
    },
    function rejected(err) {
        // never gets here as Promise.resolve() returns a real Promise object based on p10
    }
);

// ======================
var p11 = Promise.resolve(21);

var p12 = p11.then(function (v) {
    console.log(v);	// 21

    // fulfill `p12` with value `42`
    return v * 2;
});

// chain off `p12`
var p13 = p12.then(function (v) {
    console.log(v);	// 42
});

// ======================
var p14 = Promise.resolve(21);

p14.then(function (v) {
    console.log(v);	// 21

    // create a promise and return it
    return new Promise(function (resolve, reject) {
        // fulfill with value `42`
        resolve(v * 2);
    });
}).then(function (v) {
    console.log(v);	// 42
});

// ======================
var p15 = Promise.resolve(15);

p15.then(
    // assumed fulfillment handler, if omitted or
    // any other non-function value passed
    // function(v) {
    //     return v;
    // }
    null,
    function rejected(err) {
        // never gets here
    }
).then(function (v) {
    console.log(v);
});