const path = require('path');
const file = path.join(require('os').homedir(), 'softeng22_84.token')
const axios = require('axios');
const jwt = require('jsonwebtoken');
const random = require('../secret');
var fs = require('fs')

async function session_upd(args){
    if (!(fs.existsSync(file))) {
        console.error("You have not Login. In order to Execute Session_upd you have to Login First As Admin")
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
                            console.log('You are authorized to use Session_upd')
                            const session_path = path.join(require('os').homedir(), `${args}`)
                            if (!(fs.existsSync(session_path))) {
                                console.error(`The file with Name [${args}] was not found, please make sure that you have placed the file in your home directory`)
                            }
                            else{
                                fs.readFile(session_path, 'utf8', async function (err, obj) {
                                    if (err) throw err;
                                    try{
                                        var session = JSON.parse(obj);
                                    }
                                    catch(e){
                                        console.log('Wrong JSON format')
                                        return
                                    }
                                    await axios.post('http://localhost:3000/api/admin/session_upd', session, {
                                        headers: {
                                            'Cookie' : `jwt=${data}`,
                                            'Accept': 'application/json',
                                        }, withCredentials: true}).then(response => console.log(response.data)).catch(error => console.log(error))
                                  }); 
                            }
                        }
                        else {
                            console.log('You are not authorized to use Session_upd')
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

module.exports = {session_upd}