const axios = require('axios');
const path = require('path');

async function login(args){
    try {
        const LocalStorage = require('node-localstorage').LocalStorage;
        const localStorage = new LocalStorage(require('os').homedir(), 'softeng22_84.token');
        var newPost = {
            "username": args.username,
            "password": args.password
        }
        axios.post('http://localhost:3000/api/login', newPost).then((response) => {
            let apikey = response.data
            console.log(apikey)
            localStorage.setItem('softeng22_84.token', apikey.token.toString())
        }).catch(error => console.log(error)); 
    } catch (err) {
        console.error(err);
}}

module.exports = {login}
