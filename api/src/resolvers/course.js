import Course from "../models/Course";
import Grade from "../models/Grade";
import Student from "../models/Student";
import Teacher from "../models/Teacher";

// Query
export const allCourses = async (_, args, ctx) => {
  if (args._id) {
    return await Course.find({ _id: args._id });
  } else {
    return await Course.find();
  }
};

// Mutation
export const createCourse = async (_, args, ctx) => {
  const newCourse = await new Course(args.input).save();

  const grade = await Grade.findById(args.input.grade._id);
  grade && grade.courses.push(newCourse._id);
  grade && (await grade.save());

  return newCourse;
};

export const editCourse = async (_, args, ctx) => {
  let course = await Course.findById(args._id);
  const { teacherId, studentId, deleteMode } = args;

  //Compruebo si ya existe el alumno o profesor para saber si lo agrego/elimino despues
  let teacherExist = course.teachers.find(el => parseInt(el._id) === parseInt(teacherId))
  let studentExist = course.students.find(el => parseInt(el._id) === parseInt(studentId))

  try {
    if (!deleteMode) {
      if (studentId && !studentExist) {
        try {
          course.students.push(studentId);
          let student = await Student.findById(studentId);
          student.courses.push(course._id);
          await student.save();
        } catch (error) {
          console.error(error);
          return error;
        }
      }
      if (teacherId && !teacherExist) {
        try {
          course.teachers.push(teacherId);

          let teacher = await Teacher.findById(teacherId);
          teacher.courses.push(course._id);
          await teacher.save();
        } catch (error) {
          console.error(error);
          return error;
        }
      }

      for (let key in args.input) {
        key ? (course[key] = args.input[key]) : course[key];
      }
    } else {
      /**
       * !Si el deleteMode esta activado, se busca el id del profesor o estudiante y se lo borra
       */
      for (let key in args.input) {
        key ? (course[key] = args.input[key]) : course[key];
      }
      let teacher;
      let student;
      teacherId &&
        (course.teachers = course.teachers.filter(
          ({ _id }) => parseInt(_id) !== parseInt(teacherId)
        )) &&
        (teacher = await Teacher.findById(teacherId)) &&
        teacher.courses.filter(
          ({ _id }) => parseInt(_id) !== parseInt(course._id)
        ) &&
        (await teacher.save());

      studentId &&
        (course.students = course.students.filter(
          ({ _id }) => parseInt(_id) !== parseInt(studentId)
        )) &&
        (student = await Student.findById(studentId)) &&
        student.courses.filter(
          ({ _id }) => parseInt(_id) !== parseInt(course._id)
        ) &&
        (await student.save());
    }
    await course.save();
    return course;
  } catch (err) {
    console.error(err);
  }
};

export const deleteCourse = async (_, args, ctx) => {
  return await Course.findByIdAndDelete(args._id);
};
