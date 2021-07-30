require('dotenv').config();
const { exec } = require('child_process')

console.log(process.env.API_KEY);

const command = `cd src && web-ext sign --api-key="${process.env.API_KEY}" --api-secret="${process.env.API_SECRET}"`
exec(command, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});
