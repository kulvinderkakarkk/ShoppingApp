import { model, Schema } from "mongoose";

const orders = new Schema({
    username: String,
    product_details: [], // {product id, quantity}
})

export default model('orders', orders)