import { gql } from "apollo-server-express";

export const classTypes = gql`
  type Class {
    _id: ID
    name: String
    files: [String]
    deliveries: [String]
    subject: Subject
    module: Module
    homework: String
  }

  input ClassInput {
    _id: ID
    name: String
    files: [String]
    deliveries: [String]
    subject: ID
    module: ID
    homework: String
  }
`;
