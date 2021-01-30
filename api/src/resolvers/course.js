import Course from "../models/Course";
import Grade from "../models/Grade";

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
  try {
    if (!deleteMode) {
      teacherId && course.teachers.push(teacherId);
      studentId && course.students.push(studentId);

      for (let key in args.input) {
        key ? (course[key] = args.input[key]) : null;
      }
    } else {
      /**
       * !Si el deleteMode esta activado, se busca el id del profesor o estudiante y se lo borra
       */
      teacherId &&
        (course.teachers = course.teachers.filter(
          ({ _id }) => parseInt(_id) !== parseInt(teacherId)
        ));
      studentId &&
        (course.students = course.students.filter(
          ({ _id }) => parseInt(_id) !== parseInt(studentId)
        ));
    }
    await course.save();
    return course;
  } catch (err) {
    console.error(err);
  }

  // return await Course.findByIdAndUpdate(
  //   args._id,
  //   { $push: args.input },
  //   { new: true }
  // );
};

export const deleteCourse = async (_, args, ctx) => {
  return await Course.findByIdAndDelete(args._id);
};
