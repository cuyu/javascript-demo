function* foo() {
    console.log("`*foo()` starting");
    yield 3;
    yield 4;
    console.log("`*foo()` finished");
}

function* bar() {
    yield 1;
    yield 2;
    yield* foo();	// `yield`-delegation!
    yield 5;
}

var it = bar();

it.next().value;	// 1
it.next().value;	// 2
it.next().value;	// `*foo()` starting
// 3
it.next().value;	// 4
it.next().value;	// `*foo()` finished
// 5


// ===================Without `yield`-delegation===================
function myBar() {
    var sequence = [1, 2, foo(), 5];
    var index = 0;

    return {
        // needed for `for..of` loops
        [Symbol.iterator]: function () {
            return this;
        },

        // standard iterator interface method
        next: function () {
            if (index >= sequence.length) {
                return {done: true, value: undefined};
            }

            var value = sequence[index];
            // if value is a generator, use its next value and index stay unchanged
            if (value && typeof value.next === "function") {
                var nextVal = value.next();
                if (!nextVal.done) {
                    value = nextVal.value;
                }
                else {
                    // if the generator is done, use the next value of myself
                    index++;
                    value = this.next().value;
                }
            }
            else{
                index++;
            }

            return {done: false, value: value};
        }
    };
}

var myIt = myBar();
for (i of myIt) {
    console.log(i);
}


console.log('============================================');
function *foo3() {
    var a = yield 1;
    console.log(a); // undefined
    return 2;
}

function *bar3() {
    var b = yield *foo3();
    console.log(b); // 2
    var c = yield 3;
    console.log(c); // 4
}

var it3 = bar3();

it3.next();    // {value: 1, done: false}
it3.next();    // {value: 3, done: false}
it3.next(4);    // {value: undefined, done: true}

