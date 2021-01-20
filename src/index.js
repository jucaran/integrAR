import express from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";

import resolvers from "./resolvers/index";
import typeDefs from "./schemas/index";

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
app.use(cors());
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log("Now browse to http://localhost:4000" + server.graphqlPath)
);
