const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
    questionnaireID: {
        required: true,
        type: String
        //unique: true
    },
    session: {
        required: true,
        type: String,
        unique: true
    },
   answers:[{
    qID : String,
    ans : String,
    _id : false
     }],
},
{ 
    versionKey: false 
})


mongoose.model('Session', sessionSchema)