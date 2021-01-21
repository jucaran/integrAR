import express from "express";
import mongoose from "mongoose";
import { connect } from "./database";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./schemas.js";
import resolvers from "./resolvers.js";
import Teacher from "./models/Teacher";
import SuperAdmin from "./models/SuperAdmin";

const app = express();
connect();

const { PORT, API_URL } = process.env;

const SERVER = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    SuperAdmin,
    Teacher,
    // Student,
    // Course,
    // Subject,
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
  console.log("Server on port 4000");
});

// INSTRUCTIONS
// 1. Create new node proyect, npm init --yes
// 2. Install Dependencies, npm i express graphql apollo-server-express graphql-tools mongoose
//                          npm i babel-cli babel-core babel-preset-env -D --> Last actuallitationes of JS
// 3. Package json define dev to run server whit babel.
// 4. Create .babelrc to initialice babel
// 5. Create index.js, import express and create server
// 6. Create databes to conect with mongo db, and call in index.js
// 7. Install dotenv
// 8. Import apollo server
// 9.
// 10.
// 11.
// 12.
// 13.
// 14.
// 15.
// 16.
// 17.
// 18.
// 19.
// 20.
// 21.
// 22.
// 23.
// 24.
// 25.
// 26.
// 27.
// 28.
// 29.
// 30.
