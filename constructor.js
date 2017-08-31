function A(a, b, c) {
    console.log('A is constructed with arguments:', a, b, c);
}

class B extends A {
    constructor() {
        super(1, 2);
        console.log('B is constructed');
    }
}

let b = new B();
console.log(A.prototype.constructor === A);