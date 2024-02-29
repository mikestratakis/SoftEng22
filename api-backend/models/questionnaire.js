const mongoose = require('mongoose')

const optionSchema = new mongoose.Schema({
    optID: {
        type: String,
        unique: false
    },
    opttxt: {
        type: String
    },
    optvalue:{
        type: String
    },
    nextqID: {
        type: String
    },
    _id : false
})

const questionSchema = new mongoose.Schema({
    qID: {
        type: String,
        unique: false
    },
    qtext: {
        type: String,
        unique: false
    },
    required: {
        type: String
    },
    type: {
        type: String
    },
    options:{
        type: [optionSchema]
    },
    _id : false
})

const questionnaireSchema = new mongoose.Schema({
    questionnaireID: {
        type: String,
        unique: true
    },
    questionnaireTitle: {
        type: String
    },
    keywords: {
        required: false,
        type: Array
    },
    questions:{
        type: [questionSchema]
    },
},{ 
    versionKey: false 
})


mongoose.model('Questionnaire',questionnaireSchema)