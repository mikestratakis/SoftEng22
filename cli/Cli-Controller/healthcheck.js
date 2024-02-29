const path = require('path');
const file = path.join(require('os').homedir(), 'softeng22_84.token')
const axios = require('axios');
const jwt = require('jsonwebtoken');
const random = require('../secret');
var fs = require('fs')

async function healthcheck(args){
    if (!(fs.existsSync(file))) {
        console.error("You have not Login. In order to See HealthCheck you have to Login First")
    }
    else{
        fs.readFile(file, {encoding: 'utf-8'}, function(err,data){
            if (!err) {
                jwt.verify(data, random.secret, async (err, decodedToken)=>{
                    if(err) {
                        console.log("token is not valid");
                        console.log(err.message);
                    }
                    else {
                        if(decodedToken.role == 'administrator'){
                            console.log('You are authorized to use HealthCheck')
                            axios.get('http://localhost:3000/api/admin/healthcheck', {
                                headers:
                                {
                                    'Cookie' : `jwt=${data}`
                                }}).then(response => console.log(response.data)).catch(error => console.log(error))}
                        else {
                            console.log('You are not authorized to use HealthCheck')
                        }
                    }
                })
            }
            else {
                console.log(err);
            }
        })
    }
}

module.exports = {healthcheck}