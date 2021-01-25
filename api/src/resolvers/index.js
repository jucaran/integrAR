import { allTeachers, createTeacher, editTeacher, deleteTeacher } from "./teacher";
import { allStudents, createStudent, editStudent, deleteStudent } from "./student";
import { allCourses, createCourse, editCourse, deleteCourse } from "./course"
import { allGrades, createGrade, editGrade, deleteGrade } from "./grade";
import { admin, createAdmin, editAdmin, deleteAdmin } from "./admin";
import { allSubjects, createSubject, editSubject, deleteSubject } from "./subjects";

export default {

  // GET REQUEST
  Query: {
    admin,
    teachers: allTeachers,
    students: allStudents,
    grades: allGrades,
    courses: allCourses,
    subjects: allSubjects,
  },

  // PUT, POST, DELETE REQUEST
  Mutation: {
    
    // PRECEPTOR
    createAdmin,
    editAdmin,
    deleteAdmin,

    // PROFESORES
    createTeacher,
    editTeacher,
    deleteTeacher,

    // ALUMNOS
    createStudent,
    editStudent,
    deleteStudent,

    // GRADOS
    createGrade,
    editGrade,
    deleteGrade,

    // CURSOS
    createCourse,
    editCourse,
    deleteCourse,

    // MATERIAS
    createSubject,
    editSubject,
    deleteSubject,
  },
};
