import {
  allTeachers,
  createTeacher,
  editTeacher,
  deleteTeacher,
} from "./teacher";
import {
  allStudents,
  createStudent,
  editStudent,
  deleteStudent,
} from "./student";
import { allCourses, createCourse, editCourse, deleteCourse } from "./course";
import { allGrades, createGrade, editGrade, deleteGrade } from "./grade";
import { admin, createAdmin, editAdmin, deleteAdmin } from "./admin";
import {
  allSubjects,
  createSubject,
  editSubject,
  deleteSubject,
} from "./subjects";
import { allUsers, createUser, login, editUser, deleteUser } from "./user";
import { getModules } from "./module";
import { getClasses, uploadClassFile, createClass, editClass } from "./class";
import { uploadCsv } from "./files";

export default {
  // GET REQUEST
  Query: {
    admin,
    user: allUsers,
    teachers: allTeachers,
    students: allStudents,
    grades: allGrades,
    courses: allCourses,
    subjects: allSubjects,
    modules: getModules,
    classes: getClasses,
  },

  // PUT, POST, DELETE REQUEST
  Mutation: {
    // USUARIO
    login,
    createUser,
    editUser,
    deleteUser,

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

    // CLASES
    createClass,
    editClass,
    uploadClassFile,
    // uploadCsv,
  },
};
