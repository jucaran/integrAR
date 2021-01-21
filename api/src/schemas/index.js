import { gql } from "apollo-server-express";

export default gql`
  type Course {
    id: Int
    title: String
    author: String
    topic: String
    url: String
  }

  type Query {
    course(id: Int): [Course]
  }

  type Mutation {
    addCourse(
      id: Int
      title: String
      author: String
      topic: String
      url: String
    ): Course
  }
`;
