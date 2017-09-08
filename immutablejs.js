const {fromJS} = require('immutable');

function withImmutable(s1) {
    return s1.set('a', 'abc');
}

function withoutImmutable(s1) {
    s1.a = 'abc';
    return s1;
}

s1 = fromJS({a: 'qwe'});
s2 = withImmutable(s1);
console.log(s1 === s2);
s3 = {a: 'qwe'};
s4 = withoutImmutable(s3);
console.log(s3 === s4);
