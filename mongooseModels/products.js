import {model, Schema} from 'mongoose'

const products = new Schema({
    'name': String,
    'description': String,
    'price': Number,
    'image_path': String
})

export default model('products', products)