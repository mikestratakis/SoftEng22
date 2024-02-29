const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String
    },
    role: {
        required: true,
        type: String,
        enum: ['user', 'administrator']
    }
}, {
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id
            delete ret._id
            delete ret.__v
            return ret
        }
    }
})


mongoose.model('User', userSchema)