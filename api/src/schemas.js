
export default `

  type Query {
    hello: String
    teachers: String
    students: [Student]
    courses: [Course]
    subjects: [Subject]
  }

  type Teacher {
    _id: ID
    name: String
    lastname: String
    email: String
    whatsapp: String
    courses : [Course]
  }

  type Student {
    _id: ID
    name: String
    lastname: String
    email: String
    whatsapp: String
  }

  type Course {
    _id: ID
    grade: Int
    subjects: [Subject]
  }

  type Subject {
    _id: ID
    name: String
  }
`


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




          