
const express = require('express')
const loginController = require('../controllers/signin.controller')
const router = express.Router()
router.post('/', loginController.Login)
module.exports = router



 
