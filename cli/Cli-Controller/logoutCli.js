const path = require('path');
const fs = require('fs');
const file = path.join( require('os').homedir(), 'softeng22_84.token')

async function logout() {

    if (!(fs.existsSync(file))) {
            console.error("You have not Login. In order to Logout you have to Login First")
    }
    else {
        fs.unlink(file, (err) => {
            if (err) throw err;
            console.log("Log Out Successful");
        });
    }
    return 0
}

module.exports = {logout}
