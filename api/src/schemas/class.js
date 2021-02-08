import { gql } from "apollo-server-express";

export const classTypes = gql`
  type Class {
    _id: ID
    name: String
    files: [String]
    deliveries: [String]
    subject: Subject
    module: Module
    corrections: [Correction]
    homework: String
  }

  input ClassInput {
    _id: ID
    name: String
    files: [String]
    deliveries: [String]
    subject: ID
    module: ID
    corrections: InputCorrection
    homework: String
  }

  type Correction {
    student: Student
    score: String
    feedback: String
  }

  input InputCorrection {
    student: ID!
    score: String!
    feedback: String
  }
`;
