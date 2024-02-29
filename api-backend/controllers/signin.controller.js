
const mongoose = require('mongoose')
const path = require('path')
const util = require('util')
const bcrypt = require('bcrypt')
const fs = require('fs')
const jsonwebtoken = require('jsonwebtoken')

const readFile = util.promisify(fs.readFile)
const sign = util.promisify(jsonwebtoken.sign)

require('../models/user')
const User = mongoose.model('User')
const error = require('../error')


async function Login(req, res, next) {
    try 
    {
        const conditions = {
            username: req.body.username,
            password: req.body.password
        }
        const user = await User.findOne(conditions).exec()
        if (!user)
            return next(new error.NotFoundError('username'))

        // const same = await bcrypt.compare(req.body.password, user.hash)
        // if (!same)
        //     return next(new error.NotFoundError('password'))
        const data = await readFile(path.resolve(__dirname, 'secret'))

        ////////////
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





function returnError (err, req, res, next) {
    res.status(err.statusCode || 500).send(err.name)
   }




module.exports = {Login}


















