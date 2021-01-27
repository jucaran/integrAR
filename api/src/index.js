import express from "express";
import cors from "cors";
import { connect } from "./database";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./schemas/index.js";
import resolvers from "./resolvers/index.js";
import isAuth from "./middleware/is-auth"


const app = express();
app.use(isAuth);
app.use(cors());
connect();


const { PORT, API_URL } = process.env;


const SERVER = new ApolloServer({
  typeDefs,
  resolvers,

  context: ({ req }) => {
    const UserAuth = req.isAuth

    return { UserAuth }

  },
  introspection: true,
  playground: true,
  playground: {
    endpoint: `${API_URL}/graphql`, 
    settings: {
      "editor.theme": "dark",
    },
  },
});

SERVER.applyMiddleware({
  app,
});

app.set("port", PORT);
app.listen(app.get("port"), () => {
  console.log(`Server on port ${PORT}`);
});