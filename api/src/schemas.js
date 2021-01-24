import { gql } from "apollo-server-express";
// SuperAdmin
export default gql`
  type Query {
    superAdmin: String
    teachers: [Teacher]
    students: [Student]
    courses: [Course]
    grades: [Grade]
    subjects: [Subject]
  }

  type Mutation {


    createSuperAdmin(input: SuperAdminInput): SuperAdmin
    editSuperAdmin(_id: ID, input: SuperAdminInput): SuperAdmin
    deleteSuperAdmin(_id: ID): SuperAdmin

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
    editCourse(_id: ID, input: CourseInput): Course
    deleteCourse(_id: ID): Course

    createSubject(input: SubjectInput): Subject
    editSubject(_id: ID, input: SubjectInput): Subject
    deleteSubject(_id: ID): Subject
  }

  type SuperAdmin {
    _id: ID
    name: String
    lastname: String
    dni: Int
    email: String
    whatsapp: String
    address: String
    birthday: String
    foto: String
    grades: [Grade]
    courses: [Course]
    teachers: [Teacher]
    subjects: [Subject]
    students: [Student]
  }
  input SuperAdminInput {
    _id: ID
    name: String
    lastname: String
    dni: Int
    email: String
    whatsapp: String
    address: String
    birthday: String
    foto: String
  }
  

  type Teacher {
    _id: ID
    name: String
    lastname: String
    dni: Int
    email: String
    whatsapp: String
    address: String
    birthday: String
    foto: String
    grades: [Grade]
    courses: [Course]
    subjects: [Subject]
    students: [Student]
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
    foto: String
  }


  type Student {
    _id: ID
    name: String
    lastname: String
    dni: Int
    email: String
    whatsapp: String
    address: String
    birthday: String
    foto: String
    courses: [Course]
    grades: [Grade]
    teachers: [Teacher]
    subjects: [Subject]
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
    foto: String
  }


  type Grade {
    _id: ID
    name: String
    courses: [Course]
  }
  input GradeInput {
    _id: ID
    name: String
    courses: [CourseInput]
  }


  type Course {
    _id: ID
    name: String
    grades: [Grade]
  }
  input CourseInput {
    _id: ID
    name: String
    grades: [GradeInput]
  }


  type Subject {
    _id: ID
    name: String
    teachers: [Teacher]
  }
  input SubjectInput {
    _id: ID
    name: String
    teachers: [TeacherInput]
  }
`;

// type Subject {
//   _id: ID
//   name: String
// }

// Chile -> 1° básico a 8°básico (primaria) 6 años a 13 años
//       -> 1° medio a 4° medio (secundaria)  14 años a 18 años

// Vzla  -> 1° básico a 6°básico (primaria)   6 años 11 años
//       -> 1° medio a 5° medio (secundaria) 12 años 16 años

// (superadmin)
// Preceptor ---> Lista de Profes (Marcos, Matias)     --->
//           ---> Lista de Alumnos (Lis, Laura, Sixto)           || De aquí en adelante lo hace el profe
//           ---> Lista de Cursos  (1°, -> Materias (Lenguaje,         ---> Comprensión de lectura, -> Quiz
//                                                   Matematica        ---> Sumas, restas -> Quiz
//                                                   )
//           ---> Lista de Cursos  (2°, -> Materias (Lenguaje,         ---> Poesía -> Quiz
//                                                   Matematica        ---> Fracciones -> Quiz
//                                                   )
//           ---> Lista de Cursos  (3°, -> Materias (Lenguaje,         ---> Poetas -> Quiz
//                                                   Matematica        ---> Ecuaciones -> Quiz
//                                                   )

// el super admin puede ver a los profesores y los alumnos que tiene cad uno asignado
// desde la vista del alumno, pueda ver cuales son los profesores que le asignaron

// SuperAdmin Crea en orden --> Materias, Profesores, A

//

// 1
// Crear todos los profesores de una
// Crear todos los alumnos de una
// Ir asociando en materias, colocar profesor en la materia y alumno en el curso

// 2
// Grado (1 año, 2 Año ...) ---> Cursos   -> guardarlo como x
// Curso (1.A, 2.B) --> Alumnos, Materias
// Materia (Lengua, Mat ...) --> Profe
// ------------------------------------------------------------
// Alumno --> Curso -> asignar un curso al alumno
// Alumno (Sixto, Joaquin...) --> Grado, Curso (1°A) este se asigna, los demas por get, Materia, Profe

// Fulanito1 1°A
// Fulanito2 1°A
// Fulanito3 1°A
// Fulanito4 1°A

// Profesor (Pedro, Maria...) --> Materias

// duda, el front hace la peticion al back con axios ?
// con forma de query? o con rutas, o como
