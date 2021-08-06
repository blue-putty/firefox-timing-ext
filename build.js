require('dotenv').config();
const fs = require('fs')
const { spawn } = require('child_process');

incrementVersion();
sign();

function incrementVersion() {
    const manifestPath = './src/manifest.json'
    const buildPath = './build'
    // fs.readFile(buildPath)
    fs.readFile(manifestPath, function(err, dataBuffer) {
        if (err) throw err;
        const manifest = JSON.parse(dataBuffer.toString());
        manifest.version 
        console.log(manifest);
    })
}

function sign() {
    const command = 'web-ext';
    const args = [
        'sign',
        `--api-key="${process.env.API_KEY}"`,
        `--api-secret="${process.env.API_SECRET}"`,
        `--artifacts-dir=./build`,
        `--source-dir=./src`,
    ]

    let ls = spawn(command, args, {shell: true});

    ls.stdout.on('data', function (data) {
        console.log('stdout: ' + data.toString());
    });

    ls.stderr.on('data', function (data) {
        console.log('stderr: ' + data.toString());
    });

    ls.on('exit', function (code) {
        console.log('child process exited with code ' + code.toString());
    });
}