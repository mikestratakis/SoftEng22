const jwt = require('jsonwebtoken');
const random = require('../models/secret');
const mongoose = require('mongoose')
require('../models/user')
const User = mongoose.model('User')
const error = require('../error')

async function Logout(req, res, next) {
    try{
        const token_back_end =  req.cookies.jwt;
        const token_front_end =  req.body.token;
        if(token_back_end || token_front_end){
            console.log("token exists");
            if(token_back_end){
                jwt.verify(token_back_end, random.secret, async (err, decodedToken)=>{
                    if(err){
                        console.log("token is not valid");
                        console.log(err.message);
                        res.status(400).send("err while authenticating cookie ")   
                    }
                    else{
                        console.log(decodedToken);
                        console.log("token is valid");
        
                         await User.findOne({
                            where:{
                                username: decodedToken.id,
                            }
                        }).then(user => {
                            //here we replace token with the name jwt with an empty string that expires in 1 sec
                            //so we achieve logout and delele user cookie from back-end also
                            res.cookie('jwt', '', {maxAge: 1});
                            res.redirect(200, '/');
                            console.log("user: ...", user.username, " is logged out");
                            });
                    }
                });
            }
            else if (token_front_end) {
                jwt.verify(token_front_end, random.secret, async (err, decodedToken)=>{
                    if(err){
                        console.log("token is not valid");
                        console.log(err.message);
                        res.status(400).send("err while authenticating cookie ")   
                    }
                    else{
                        console.log(decodedToken);
                        console.log("token is valid");
        
                         await User.findOne({
                            where:{
                                username: decodedToken.id,
                            }
                        }).then(user => {
                            //console.log("found user: ...", user.username);
                            //here we replace token with the name jwt with an empty string that expires in 1 sec
                            //so we achieve logout and delele user cookie from back-end also
                            res.cookie('jwt', '', {maxAge: 1});
                            res.status(200);
                            console.log("user: ...", user.username, " is logged out");
                            });
                    }
                });
            }
        }
        else{
            req.app.locals.user = null;
            res.status(401).send('[error] user is not logged in for logout to happen');
            //console.log("logout failed since no one is logged in");
        }
    }
    catch(err){
        next(new error.BadRequestError(err))
    }
}

module.exports = {Logout}
