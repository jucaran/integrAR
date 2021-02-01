import { gql } from "apollo-server-express";

export const classTypes = gql`
  type Class {
    _id: ID
    name: String
    files: [String]
    homework: String
    correction: String
    test: String
  }

  input ClassInput {
    _id: ID
    name: String
    files: [String]
    subject: ID
    homework: String
    correction: String # ? tal vez lo deberia tener el alumno
    test: String # ? tal vez lo deberia tener la unidad
  }
`;
