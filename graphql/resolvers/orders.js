import orderModel from '../../mongooseModels/order.js'
import { decodeToken } from '../../util.js'

const orders = {
    Query: {
        async getOrdersByUsername(parent, args, contextValue, info) {
            decodeToken(contextValue)
            const {username} = args.username
            const orders = await reviewModel.find({username: username})
            return orders
        }
    },
    Mutation: {
        async addEditOrder(parent, args, contextValue, info) {
            decodeToken(contextValue)
            let payload = args['orderInput']
            // Check for existing orders
            let existingOrder = await orderModel.find({username: payload.username})
            if(existingOrder.length == 0) {
                let newOrder = new orderModel({
                    username: payload.username,
                    product_details: payload.product_details
                })
                await newOrder.save()
                return {
                    'username': payload.username,
                    'product_details': payload.product_details
                }
            } else {
                const updatedOrder =await orderModel.findOneAndReplace({username: payload.username}, payload)
                return {
                    'username': payload.username,
                    'product_details': payload.product_details
                }
            }
        }
    }
}

export default orders