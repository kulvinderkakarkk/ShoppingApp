import { GraphQLError } from 'graphql'
import productModel from '../../mongooseModels/products.js'
import { decodeToken } from '../../util.js'
import { decode } from 'jsonwebtoken'

const products = {
    Query: {
        async getProducts(parent, args, contextValue, info) {
            let token = decodeToken(contextValue)
            const products = await productModel.find()
            return products
        },
        async getProductDetail(parent, args, contextValue, info) {
            let token = decodeToken(contextValue)
            const product = await productModel.findById(args.id)
            return product
        },
        async getProductsByName(parent, args, contextValue, info) {
            let token = decodeToken(contextValue)
            const name = args.name
            const products = await productModel.find({name: {$regex: name}})
            return products
        }
    },
    Mutation: {
        async addProduct(parent, args, contextValue, info) {
            let token = decodeToken(contextValue)
            const {image_path, price, description, name} = args['productInput']
            const product = new productModel({name, description, price, image_path, reviews:[]})
            const response = await product.save()
            return {
                id: response.id,
                name: response.name,
                price: response.price,
                image_path: response.image_path,
                reviews: response.reviews,
                description: response.description
            }
        },
        async editProduct(parent, args, contextValue, info) {
            decodeToken(contextValue)
            const {id, productInput} = args
            // const existingProduct = await productModel.findById(id)
            // existingProduct['productInput'] = productInput
            const updatedProduct = await productModel.findOneAndReplace({'_id':id}, productInput)
            return updatedProduct
        },
        async deleteProduct(parent, args, contextValue, info) {
            let token = decodeToken(contextValue)
            const product = await productModel.findById(args.id)
            if(product == null) {
                throw new GraphQLError('Product not in database', {
                    extensions: {code: 'BAD_USER_INPUT'}
                })
            }
            else {
                await productModel.deleteOne({
                    _id: args.id
                })
            }
            return {
                id: product.id,
                name: product.name,
                price: product.price,
                image_path: product.image_path,
                reviews: product.reviews,
                description: product.description
            }
        }
    }
}

export default products;
