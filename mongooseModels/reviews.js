import {model, Schema} from 'mongoose'

const reviews = new Schema({
    'product_id': String,
    'username': String,
    'description': String
})

export default model('reviews', reviews)