const path = require('path');
const file = path.join(require('os').homedir(), 'softeng22_84.token')
const axios = require('axios');
const jwt = require('jsonwebtoken');
const random = require('../secret');
var fs = require('fs')

function onlyLettersAndNumbers(str) {
    return /^[A-Za-z0-9]*$/.test(str);
  }

async function admin(args){
    if (!(fs.existsSync(file))) {
        console.error("You have not Login. In order to Execute Admin Calls you have to Login First As Admin")
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
                            console.log('You are authorized to use Admin Calls')
                            if (Object.keys(args).length == 2){
                                if (onlyLettersAndNumbers(args.username) && onlyLettersAndNumbers(args.password)){
                                    await axios.post(`http://localhost:3000/api/admin/usermod/${args.username}/${args.password}/`, "",{
                                    headers: {
                                        'Cookie' : `jwt=${data}`,
                                        'Accept': 'application/json',
                                    }, withCredentials: true}).then(response => console.log(response.data)).catch(error => console.log(error))
                                }
                                else{
                                    console.log('Please enter as username/password only letters or numbers')
                                }
                            }
                            else{
                                await axios.get(`http://localhost:3000/api/admin/users/${args}`, {
                                headers: {
                                    'Cookie' : `jwt=${data}`,
                                    'Accept': 'application/json',
                                }, withCredentials: true}).then(response => console.log(response.data)).catch(error => console.log(error))
                            }
                        }
                        else {
                            console.log('You are not authorized to Execute Admin Calls')
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

module.exports = {admin}