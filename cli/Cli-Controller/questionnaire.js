const path = require('path');
const file = path.join(require('os').homedir(), 'softeng22_84.token')
const axios = require('axios');
const jwt = require('jsonwebtoken');
const random = require('../secret');
var fs = require('fs')

async function questionnaire(args){
    if (!(fs.existsSync(file))) {
        console.error("You have not Login. In order to Execute Questionnaire you have to Login First As Admin")
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
                            console.log('You are authorized to use Questionnaire')
                            await axios.get(`http://localhost:3000/api/questionnaires/${args}`, {
                                headers: {
                                    'Cookie' : `jwt=${data}`,
                                    'Accept': 'application/json',
                                }, withCredentials: true}).then(response => console.log(response.data)).catch(error => console.log(error))
                        }
                        else {
                            console.log('You are not authorized to use Questionnaire')
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

module.exports = {questionnaire}