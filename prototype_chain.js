var a = {a: 1};
console.log(a.__proto__);  // {}
console.log(a.__proto__.__proto__);  // null

var b = function () {
    return 'b';
};
console.log(b.__proto__);  // [Function]
console.log(b.__proto__.__proto__);  // {}
console.log(b.__proto__.__proto__.__proto__);  // null

// ============
console.log(a.__proto__ === Object.prototype);  // true
console.log(b.__proto__ === Function.prototype);  // true
console.log(b.__proto__.__proto__ === Object.prototype);  // true

var c = {c: 3};
console.log(c.__proto__ === a.__proto__);  // true

// ============
var d = {d: 4};
var e = {};
e.prototype = {
    d: 5,
    e: 5,
};
d.__proto__ = e.prototype;  // Caution: don't do this out of the example
console.log(d.d);  // 4
console.log(d.e);  // 5

d.e = 6;  //  Refer: http://cuyu.github.io/javascript/2016/12/12/Reading-this-&-Object-Prototypes-3
console.log(d);  // { d: 4, e: 6 }
console.log(e.prototype);  // { d: 5, e: 5 }

// ============
console.log(a.prototype);  // undefined
console.log(Object.prototype);  // {}
console.log(Object.getOwnPropertyNames(Object.prototype));
/*
[ '__defineGetter__',
  '__defineSetter__',
  'hasOwnProperty',
  '__lookupGetter__',
  '__lookupSetter__',
  'propertyIsEnumerable',
  '__proto__',
  'constructor',
  'toString',
  'toLocaleString',
  'valueOf',
  'isPrototypeOf' ]
*/
console.log(Object.getOwnPropertyNames(Function.prototype));
/*
[ 'length',
  'name',
  'arguments',
  'caller',
  'apply',
  'bind',
  'call',
  'toString',
  'constructor' ]
*/

// ===========
var f = function () {
    this.f = 'fff';
    console.log('constructed!');
};
var f1 = new f();  // constructed!
console.log(f1.f);  // fff
console.log(f1.__proto__ === f.prototype);  // true
console.log(Object.getOwnPropertyNames(f.prototype));  // [ 'constructor' ]
console.log(f.prototype.constructor === f);  // true
console.log(f1.prototype);  // undefined

// ===========
// Do Not use `return` in constructor function
var g = function () {
    this.a = 1;
    return {g: 'gg'};
};
var g1 = new g();
console.log(g1);  // { g: 'gg' }
console.log(g1.a);  // undefined

var h = function () {
    this.a = 1;
    return 2;
};
var h1 = new h();
console.log(h1);  // h { a: 1 }
console.log(h1.a);  // 1

// ===========
function A() {
    this.a = 1;
}

A.prototype.staticA = 'a';
var instA = new A();
console.log(instA.staticA);  // a

// B inherit A
function B() {
    A.call(this);
    this.b = 2;
}

B.prototype.__proto__ = A.prototype;
var instB = new B();
console.log(instB.staticA);  // a
console.log(instB.__proto__.__proto__ === A.prototype);  // true
console.log(instB.a);  // 1

// C inherit B
function C() {
    B.call(this);
    this.c = 3;
}

C.prototype.__proto__ = B.prototype;
var instC = new C();
console.log(instC.staticA);  // a
console.log(instC.a);  // 1

// ==========
// Inherit using Object.create
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
function D() {
    A.call(this);
    this.d = 4;
}
_inherits(D, A);
var instD = new D();
console.log(instD.staticA);
console.log(instD.a);