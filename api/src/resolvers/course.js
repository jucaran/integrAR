import Course from "../models/Course";
import Grade from "../models/Grade"

// Query
export const allCourses= async (_, args, ctx) => {
  if (args._id) {
    return await Course.find({ _id: args._id });
  } else {
    return await Course.find();
  }
}

// Mutation
export const createCourse= async (_, args, ctx) => {
  const newCourse = await new Course(args.input).save();

  const grade = await Grade.findById(args.input.grade._id)
  grade && grade.courses.push(newCourse._id)
  grade && await grade.save()

  return newCourse
}

export const editCourse= async (_, args, ctx) => {

  let course = await Course.findById(args._id)

  args.input.name ? (course.name = args.input.name) : null
  args.input.grade ? (course.grade = args.input.grade) : null
  args.input.teachers ? (course.teachers = args.input.teachers) : null
  args.input.subjects ? (course.subjects = args.input.subjects) : null
  args.input.students ? (course.students = args.input.students) : null

  await course.save()

  return course


  // return await Course.findByIdAndUpdate(
  //   args._id,
  //   { $push: args.input },
  //   { new: true }
  // );
  
}

export const deleteCourse= async (_, args, ctx) => {
  return await Course.findByIdAndDelete(args._id);
}