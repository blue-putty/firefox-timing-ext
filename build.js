require('dotenv').config();
const { spawn } = require('child_process');

const command = 'web-ext';
const args = [
    'sign',
    `--api-key="${process.env.API_KEY}"`,
    `--api-secret="${process.env.API_SECRET}"`
]
const options = {
    cwd: './src',
    shell: true
}

let ls = spawn(command, args, options);

ls.stdout.on('data', function (data) {
    console.log('stdout: ' + data.toString());
});

ls.stderr.on('data', function (data) {
    console.log('stderr: ' + data.toString());
});

ls.on('exit', function (code) {
    console.log('child process exited with code ' + code.toString());
});