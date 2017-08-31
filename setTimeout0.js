setTimeout(function () {
    console.log('A')
}, 0);

function demo() {
    setTimeout(function () {
        console.log('B');
    }, 0);
    console.log('C');
}

demo();
console.log('D');
