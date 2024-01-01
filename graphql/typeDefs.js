const typeDefs = `#graphql 
    input RegisterInput {
        firstName: String!,
        lastName: String!,
        email: String!,
        username: String!,
        password: String!
    }
    type User {
        id: ID!,
        username: String!,
        email: String!,
        token: String!
    }
    type Review {
        id: ID!,
        product_id: String!,
        username: String!,
        description: String!,
        createdAt: String!
    }
    input ReviewInput {
        product_id: String!,
        username: String!,
        description: String!
    }
    type Product {
        id: ID!,
        name: String!,
        price: Float!,
        image_path: String!,
        description: String!,
    }
    input ProductInput {
        name: String!
        price: Float!,
        image_path: String!,
        description: String!
    }
    type ProductDetails {
        id: ID!,
        name: String!,
        price: Float!,
        image_path: String!,
        description: String!,
        quantity: Int!
    }
    input InputProductDetails {
        id: ID!,
        name: String!,
        price: Float!,
        image_path: String!,
        description: String!,
        quantity: Int!
    }
    type Order {
        username: String!,
        product_details:[ProductDetails]!
    }

    input OrderInput {
        username: String!,
        product_details: [InputProductDetails]
    }
    type Query {
        getProducts: [Product],
        getProductDetail(id: ID!): Product,
        getReviews(product_id: String!): [Review],
        getProductsByName(name: String!): [Product],
        getOrdersByUsername(user_id: String!): Order
    }
    type Mutation {
        login(username: String!, password: String!): User,
        register(registerInput: RegisterInput): User,
        addProduct(productInput: ProductInput): Product,
        editProduct(id:ID!, productInput: ProductInput!): Product,
        addReview(reviewInput: ReviewInput): Review,
        editReview(id:ID!, reviewInput: ReviewInput!): Review,
        deleteProduct(id: ID!): Product,
        deleteReview(id: ID!): Review,
        addEditOrder(orderInput: OrderInput): Order
    }
`;

export default typeDefs