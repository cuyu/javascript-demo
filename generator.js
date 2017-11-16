function* func1() {
    var y = yield 2;
    return y;
}

var it1 = func1();

console.log(it1.next());  // { value: 2, done: false }
console.log(it1.next());  // { value: undefined, done: true }

// ==== give a input to next() ====
var it2 = func1();

console.log(it2.next());  // { value: 2, done: false }
console.log(it2.next(3));  // { value: 3, done: true }


// ================================
function* main() {
    var x = yield "Hello World";

    // never gets here
    console.log(x);
}

var it = main();

it.next();

try {
    // will `*main()` handle this error? we'll see!
    it.throw("Oops");
}
catch (err) {
    // nope, didn't handle it!
    console.error(err);			// Oops
}


// ================================
function run(gen) {
    var args = [].slice.call(arguments, 1), it;

    // initialize the generator in the current context
    it = gen.apply(this, args);

    // return a promise for the generator completing
    return Promise.resolve()
        .then(function handleNext(value) {
            // run to the next yielded value
            var next = it.next(value);

            return (function handleResult(next) {
                // generator has completed running?
                if (next.done) {
                    return next.value;
                }
                // otherwise keep going
                else {
                    return Promise.resolve(next.value)
                        .then(
                            // resume the async loop on
                            // success, sending the resolved
                            // value back into the generator
                            handleNext,

                            // if `value` is a rejected
                            // promise, propagate error back
                            // into the generator for its own
                            // error handling
                            function handleErr(err) {
                                return Promise.resolve(
                                    it.throw(err)
                                )
                                    .then(handleResult);
                            }
                        );
                }
            })(next);
        });
}

function* generator() {
    yield 1;
}

run(generator);


// ================================

function *foo() {
    console.log( "`*foo()` starting" );
    yield 3;
    yield 4;
    console.log( "`*foo()` finished" );
}

function *bar() {
    yield 1;
    yield 2;
    yield *foo();	// `yield`-delegation!
    yield 5;
}

var iter = bar();

iter.next().value;	// 1
iter.next().value;	// 2
iter.next().value;	// `*foo()` starting
// 3
iter.next().value;	// 4
iter.next().value;	// `*foo()` finished
// 5