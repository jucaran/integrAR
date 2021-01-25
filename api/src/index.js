import express from "express";
import cors from "cors";
import { connect } from "./database";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./schemas.js";
import resolvers from "./resolvers.js";
import User from "./models/User"
import SuperAdmin from "./models/SuperAdmin";
import Teacher from "./models/Teacher";
import Student from "./models/Student";
import Grade from "./models/Grade";
import Course from "./models/Course";
import Subject from "./models/Subject";

const app = express();
app.use(cors());
connect();

const { PORT, API_URL } = process.env;

const SERVER = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    User,
    SuperAdmin,
    Teacher,
    Student,
    Grade,
    Course,
    Subject
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