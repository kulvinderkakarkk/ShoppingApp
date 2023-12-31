import {model, Schema} from 'mongoose'


const user = new Schema({
    firstName: String, 
    lastName: String,
    email: String,
    username: String,
    password: String,
    createdAt: {type: Date, default: Date.now()}
})

export default model('User', user)