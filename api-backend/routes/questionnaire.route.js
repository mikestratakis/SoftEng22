
const express = require('express')
const questionnaireController = require('../controllers/questionnaire.controller')
const router = express.Router()
router.post('/save',questionnaireController.Save)
router.get('/allquestionnaires', questionnaireController.GetAllQuestionnaires)
router.get('/:questionnaireID', questionnaireController.GetQuestionnaireId)
router.get('/:questionnaireID/:questionID',questionnaireController.GetQuestionId)
module.exports = router



 
