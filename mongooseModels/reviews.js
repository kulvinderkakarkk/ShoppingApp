import {model, Schema} from 'mongoose'

const reviews = new Schema({
    'product_id': String,
    'username': String,
    'description': String,
    'createdAt': {type: Date, default: Date.now()}
})

export default model('reviews', reviews)