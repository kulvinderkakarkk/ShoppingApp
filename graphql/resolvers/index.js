import products from './products.js'
import reviews from './reviews.js'
import user from './user.js'

const resolvers = {
    Query: {
        ...products.Query,
        ...reviews.Query
    },
    Mutation: {
        ...products.Mutation,
        ...reviews.Mutation,
        ...user.Mutation
    }
}

export default resolvers