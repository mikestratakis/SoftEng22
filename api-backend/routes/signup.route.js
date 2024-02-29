
const express = require('express')
const signupController = require('../controllers/signup.controller')
const router = express.Router()
router.post('/', signupController.Register)
module.exports = router



 
