const express = require('express')
const logoutController = require('../controllers/signout.controller')
const router = express.Router()
router.post('/', logoutController.Logout)
module.exports = router