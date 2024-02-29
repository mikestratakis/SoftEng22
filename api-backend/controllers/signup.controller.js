const bcrypt = require('bcrypt')
const fs = require('fs')
const jsonwebtoken = require('jsonwebtoken')
const path = require('path')
const util = require('util')


const readFile = util.promisify(fs.readFile)
const sign = util.promisify(jsonwebtoken.sign)

const mongoose = require('mongoose')
require('../models/user')

const User = mongoose.model('User')

async function Register(req, res, next) {
    try 
    {
     
        const conditions = {
            username: req.body.username
        }
        const  sameuser = await User.findOne(conditions).exec()
        if (sameuser!=null)
            return next(new error.NotFoundError('username'))


        const user = await User.create(req.body)

        const data = await readFile(path.resolve(__dirname, 'secret'))
        const encoded = await sign({
            _id: user._id,
            username: user.username,
            role: user.role,
        }, data, {
            expiresIn: '1d'
        })

        res.cookie('jwt',encoded, { maxAge: 900000, httpOnly: true });

        res.json({
            token: encoded
        })
    } catch (err) {
        next(new error.BadRequestError(err))
    }
}




module.exports = {Register}


















// import axios from 'axios';
// import * as CryptoJS from 'crypto-js';
// import { async } from 'q';
// export default class signinController {

//     public static Login = async (req: any, res: any, next: any) => {

//         let email: string = (req.body.username).replace(/\s/g, "+");
//         let psw: string = (req.body.password).replace(/\s/g, "+");

//         let dectyptedEmail = CryptoJS.AES.decrypt(email, "ice_username").toString(CryptoJS.enc.Utf8);
//         let decryptedPsw = CryptoJS.AES.decrypt(psw, "ice_password").toString(CryptoJS.enc.Utf8);


//         let url = process.env.BASEURLLOGIN + `&username=${encodeURIComponent(dectyptedEmail)}&password=${encodeURIComponent(decryptedPsw)}`;
//         let response = await axios({
//             url: url,
//             method: 'post',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Access-Control-Allow-Origin': '*'
//             }
//         })
//             .then((res: any) => {
//                 return res.data;
//             })
//             .catch((error) => {
//                 let newError = {
//                     status: error.response.status,
//                     statusText: error.response.statusText,
//                     headers: error.response.headers,
//                     data: error.response.data,
//                     config: error.response.config
//                 }
//                 return newError;
//             })
//         if (response.status) {
//             res.status(response.status).send(response)
//         }
//         res.send(response)
//     }


//     public static getTokenFromRefreshToken = async (req: any, res: any, next: any) => {

//         let token: string = req.body.data.token;

//         let decryptedToken = CryptoJS.AES.decrypt(token, "ice_token").toString(CryptoJS.enc.Utf8);

//         let url = process.env.BASEURLLOGIN + `&refresh_token=${decryptedToken}`;

//         let response = await axios({
//             url: url,
//             method: 'post',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Access-Control-Allow-Origin': '*'
//             }
//         })
//             .then((res: any) => {
//                 return res.data;
//             })
//             .catch((error) => {
//                 let newError = {
//                     status: error.response.status,
//                     statusText: error.response.statusText,
//                     headers: error.response.headers,
//                     data: error.response.data,
//                     config: error.response.config
//                 }
//                 return newError;
//             })
//         if (response.status) {
//             res.status(response.status).send(response)
//         }
//         res.send(response)
//     }

// }