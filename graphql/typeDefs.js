const typeDefs = `#graphql 
    input RegisterInput {
        firstName: String!,
        lastName: String!,
        email: String!,
        username: String!,
        password: String!,
        createdAt: String!
    }
    type User {
        username: String!,
        password: String!,
        email: String
    }
    type Review {
        id: ID!,
        product_id: String!,
        username: String!,
        description: String
    }
    input ReviewInput {
        product_id: String!,
        username: String!,
        description: String!
    }
    type Product {
        id: ID!,
        price: Float!,
        image_path: String!,
        reviews: [Review],
        description: String!
    }
    input ProductInput {
        price: Float!,
        image_path: String!,
        description: String!
    }
    type Query {
        getProducts: [Product],
        getProductDetail(id: ID!): Product,
        getReviews(product_id: String!, username: String!): [Review]
    }
    type Mutation {
        login(username: String!, password: String!): User,
        register(registerInput: RegisterInput): User
        addProduct(productInput: ProductInput): Product
        addReview( reviewInput: ReviewInput): Review
    }
`;

export default typeDefs