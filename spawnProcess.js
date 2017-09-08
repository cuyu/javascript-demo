const {spawn} = require('child_process');
const result = spawn('ls', ['-a', '/tmp']);

result.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

result.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
});

result.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});

console.log('=== Above are async functions ===');

// Spawn NPM synchronously
// var results = spawn.sync('npm', ['list', '-g', '-depth', '0'], {stdio: 'inherit'});
// console.log(results);