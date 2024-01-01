import products from './products.js'
import reviews from './reviews.js'
import user from './user.js'
import orders from './orders.js'

const resolvers = {
    Query: {
        ...products.Query,
        ...reviews.Query,
        ...orders.Query
    },
    Mutation: {
        ...products.Mutation,
        ...reviews.Mutation,
        ...user.Mutation,
        ...orders.Mutation
    }
}

export default resolvers