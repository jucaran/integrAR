import { gql } from "apollo-server-express";

// Admin
export default gql`
  type Query {
    user(_id: ID): [User]
    admin: String
    teachers(dni: Int, _id: ID): [Teacher]
    students(dni: Int, _id: ID): [Student]
    courses(_id: ID): [Course]
    grades(_id: ID): [Grade]
    subjects(_id: ID, attribute: String, order_by: String): [Subject]
  }

  type Mutation {
    createAdmin(input: AdminInput): Admin
    editAdmin(_id: ID, input: AdminInput): Admin
    deleteAdmin(_id: ID): Admin

    # login(userInput: UserInput) : User
    login(dni: Int!, password: String!): AuthData
    createUser(userInput: UserInput): User
    editUser(_id: ID, input: UserInput): User
    deleteUser(_id: ID): User

    createTeacher(input: TeacherInput): Teacher
    editTeacher(_id: ID, input: TeacherInput): Teacher
    deleteTeacher(_id: ID): Teacher

    createStudent(input: StudentInput): Student
    editStudent(_id: ID, input: StudentInput): Student
    deleteStudent(_id: ID): Student

    createGrade(input: GradeInput): Grade
    editGrade(_id: ID, input: GradeInput): Grade
    deleteGrade(_id: ID): Grade

    createCourse(input: CourseInput): Course
    editCourse(
      _id: ID
      input: CourseInput
      teacherId: ID
      studentId: ID
      deleteMode: Boolean
    ): Course
    deleteCourse(_id: ID): Course

    createSubject(input: SubjectInput): Subject
    editSubject(_id: ID, input: SubjectInput): Subject
    deleteSubject(_id: ID): Subject
  }
  # ---------------------------
  type Admin {
    _id: ID
    name: String
    lastname: String
    dni: Int
    email: String
    whatsapp: String
    address: String
    birthday: String
    picture: String
    courses: [Course]
    grades: [Grade]
    teachers: [Teacher]
    students: [Student]
    subjects: [Subject]
  }
  input AdminInput {
    _id: ID
    name: String
    lastname: String
    dni: Int
    email: String
    whatsapp: String
    address: String
    birthday: String
    picture: String
    courses: [CourseInput]
    grades: [GradeInput]
    teachers: [TeacherInput]
    students: [StudentInput]
    subjects: [SubjectInput]
  }

  # ---------------------------
  type User {
    _id: ID
    dni: Int
    name: String
    password: String
    email: String
    role: String
  }

  type Error {
    password: Boolean
    dni: Boolean
  }

  type AuthData {
    token: String
    user: User
    error: Error
  }

  input UserInput {
    _id: ID
    dni: Int
    email: String
    password: String
  }

  # ---------------------------
  type Teacher {
    _id: ID
    name: String
    lastname: String
    dni: Int
    email: String
    whatsapp: String
    address: String
    birthday: String
    picture: String
    grades: [Grade]
    courses: [Course]
    subjects: [Subject]
    students: [Student]
    user: [User]
  }
  input TeacherInput {
    _id: ID
    name: String
    lastname: String
    dni: Int
    email: String
    whatsapp: String
    address: String
    birthday: String
    picture: String
    subjects: [SubjectInput]
    user: [UserInput]
    courses: [CourseInput]
  }

  # ---------------------------
  type Student {
    _id: ID
    name: String
    lastname: String
    dni: Int
    email: String
    whatsapp: String
    address: String
    birthday: String
    picture: String
    course: Course
    grades: [Grade]
    teachers: [Teacher]
    subjects: [Subject]
    user: [User]
  }
  input StudentInput {
    _id: ID
    name: String
    lastname: String
    dni: Int
    email: String
    whatsapp: String
    address: String
    birthday: String
    picture: String
    user: [UserInput]
  }

  # ---------------------------
  type Grade {
    _id: ID
    name: String
    courses: [Course]
    grades: [Grade]
    teachers: [Teacher]
    subjects: [Subject]
  }
  input GradeInput {
    _id: ID
    name: String
    courses: [CourseInput]
    teachers: [TeacherInput]
    subjects: [SubjectInput]
    students: [StudentInput]
  }

  # ---------------------------
  type Course {
    _id: ID
    name: String
    grade: Grade
    teachers: [Teacher]
    subjects: [Subject]
    students: [Student]
  }
  input CourseInput {
    _id: ID
    name: String
    grade: GradeInput
    teachers: [TeacherInput]
    subjects: [SubjectInput]
    students: [StudentInput]
  }

  # ---------------------------
  type Subject {
    _id: ID
    name: String
    teacher: Teacher
    course: Course
  }
  input SubjectInput {
    _id: ID
    name: String
    teacher: ID
    course: ID
  }
`;
