import {model, Schema} from 'mongoose'
import reviews from './reviews'

const products = new Schema({
    'description': String,
    'price': Number,
    'reviews': [reviews],
    'image_path': String
})

export default model('products', products)