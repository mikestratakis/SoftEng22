
const mongoose = require('mongoose')
const error = require('../error')
require('../models/questionnaire')
const Questionnaire = mongoose.model('Questionnaire')


async function Save(req, res, next) {
    try 
    {
        console.info("try to save!")
        const questionnaire = await Questionnaire.create(req.body)

        res.json({
            success: true,
            id: questionnaire._id
        })

        
    } catch (err) {
       next(new error.BadRequestError(err))
    }
}


async function GetAllQuestionnaires(req, res, next) {
    try 
    {
        const questionnaires= await Questionnaire.find().exec()
        if (questionnaires==null)
            return next(new error.NotFoundError('questionnaireid'))
        else
          {
            res.status(200).json(questionnaires)
          }
        
    } catch (err) {
       next(new error.BadRequestError(err))
    }
}


async function GetQuestionnaireId(req, res, next) {
    try 
    {
      
        const conditions = {
            questionnaireID: req.params.questionnaireID
        }
        const questionnaire = await Questionnaire.findOne(conditions).exec()
        if (questionnaire==null)
            return next(new error.NotFoundError('questionnaireid'))
        else
          {
            res.status(200).json(questionnaire)
          }
        
    } catch (err) {
       next(new error.BadRequestError(err))
    }
}


async function GetQuestionId(req, res, next) {
    try 
    {
        const conditions = {
            questionnaire: req.params.questionnaireID
        }
        const questionnaire = await Questionnaire.findOne(conditions).exec()
          
        if (questionnaire==null)
        return next(new error.NotFoundError('questionnnaire'));

          const question= questionnaire.toJSON().questions.filter((item)=>
          {
           return (item.qid==req.params.qid)
          })
          
           res.status(200).json(question);


    } catch (err) {
       next(new error.BadRequestError(err))
    }
}




module.exports = {Save,GetQuestionnaireId,GetQuestionId,GetAllQuestionnaires}


















