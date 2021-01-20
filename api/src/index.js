import dotenv from "dotenv";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import mongoose from "mongoose";
dotenv.config();
const { DB_HOST, API_URL, DB_NAME } = process.env;

//GraphQL config
import resolvers from "./resolvers/index";
import typeDefs from "./schemas/index";

//Db models
import Alumno from "./models/Alumno";
import Profesor from "./models/Profesor";
import Grado from "./models/Grado";

//We start the server once the db is connected
(async () => {
  try {
    // connection to db
    await mongoose.connect(`${DB_HOST}/${DB_NAME}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // start the apollo server
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: {
        // login
        models: {
          Alumno,
          Profesor,
          Grado,
        },
      },
    });

    // start the express server
    const app = express();
    app.use(cors());
    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () =>
      console.log(`🚀 Server ready at ${API_URL}`)
    );
  } catch (err) {
    console.log(err);
  }
})();
