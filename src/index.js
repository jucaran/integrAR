const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

const courses = [
  {
    id: 1,
    title: "Nodejs Course",
    author: "John Carter",
    topic: "javascript",
    url: "facebook.com",
  },
  {
    id: 2,
    title: "Rust Course",
    author: "John Carter",
    topic: "Rust",
    url: "facebook.com",
  },
  {
    id: 3,
    title: "Redux Course",
    author: "John Carter",
    topic: "React Redux",
    url: "facebook.com",
  },
];

const typeDefs = gql`
  type Course {
    id: Int
    title: String
    author: String
    topic: String
    url: String
  }

  type Query {
    course(id: Int!): [Course]
  }
`;

const resolvers = {
  Query: {
    course: (p, arg) => {
      return arg.id ? courses.filter((e) => e.id === arg.id) : courses;
    },
  },
  Course: {
    title(parent, arg, context, info) {
      return parent.title;
    },
    url(parent) {
      return parent.url;
    },
    id(parent) {
      return parent.id;
    },
    topic(parent) {
      return parent.topic;
    },
    author(parent) {
      return parent.author;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log("Now browse to http://localhost:4000" + server.graphqlPath)
);
