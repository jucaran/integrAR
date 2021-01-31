import Student from "../models/Student";

// Query
export const allStudents = async (_, args, ctx) => {

  if (args._id) {
    return await Student.find({ _id: args._id });
  } else if (args.dni) {
    return await Student.find({ dni: args.dni });
  } else {
    return await Student.find();
  }
}

// Mutations
export const createStudent = async (_, args, ctx) => {
  let newStudent = await new Student(args.input).save();
  const CourseId = args.input.courseId;

  if (CourseId) {
      const course = await Course.findById(CourseId)
      course && course.students.push(newStudent._id)
      course && await course.save();
  }

  return newStudent;
}

export const editStudent = async (_, args, ctx) => {
  // return await Student.findByIdAndUpdate(
  //   args._id,
  //   { $push: args.input },
  //   { new: true }
  // );
  /**
   * TODO: cuando se le agregue un estudiante a un curso, se le agregue ese curso al estudiante puto ese
   */
  let student = await Student.findById(args._id)
  
  let inputs = args.input;
  for (const key in inputs) {
    key ? (student[key] = inputs[key]) : student[key]
  }
    
  await student.save()

  return student
}

export const deleteStudent = async (_, args, ctx) => {
  return await Student.findByIdAndDelete(args._id);
}