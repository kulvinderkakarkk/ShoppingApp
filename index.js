import mongoose from "mongoose";
import dotenv from 'dotenv';
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers/index.js";

dotenv.config()

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req})=>({req})
})
mongoose
  .connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  })
  .then(async (resp) => {
    console.log("Mongo is running")
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
      });
      
      console.log(`🚀  Server ready at: ${url}`);
   })
  .catch((err) => console.log("Exception occured while running mongo:", err));
