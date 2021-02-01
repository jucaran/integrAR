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
};

// Mutations
export const createStudent = async (_, args, ctx) => {
  let newStudent = await new Student(args.input).save();
  const CourseId = args.input.courseId;

<<<<<<< HEAD
  if (CourseId) {
      const course = await Course.findById(CourseId)
      course && course.students.push(newStudent._id)
      course && await course.save();
=======
  if (studentCourses) {
    studentCourses.map(async (el) => {
      const course = await Course.findById(el._id);
      course && course.students.push(newStudent._id);
      course && (await course.save());
    });
>>>>>>> file-uploading
  }

  return newStudent;
};

export const editStudent = async (_, args, ctx) => {
  // return await Student.findByIdAndUpdate(
  //   args._id,
  //   { $push: args.input },
  //   { new: true }
  // );
<<<<<<< HEAD
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
=======

  let student = await Student.findById(args._id);

  args.input.name ? (student.name = args.input.name) : null;
  args.input.lastname ? (student.lastname = args.input.lastname) : null;
  args.input.dni ? (student.dni = args.input.dni) : null;
  args.input.email ? (student.email = args.input.email) : null;
  args.input.whatsapp ? (student.whatsapp = args.input.whatsapp) : null;
  args.input.address ? (student.address = args.input.address) : null;
  args.input.birthday ? (student.birthday = args.input.birthday) : null;
  args.input.picture ? (student.picture = args.input.picture) : null;

  args.input.grades ? (course.grades = args.input.grades) : null; // ?????
  args.input.courses ? (course.courses = args.input.courses) : null;
  args.input.teachers ? (course.teachers = args.input.teachers) : null;
  args.input.subjects ? (course.subjects = args.input.subjects) : null;

  await student.save();

  return student;
};
>>>>>>> file-uploading

export const deleteStudent = async (_, args, ctx) => {
  return await Student.findByIdAndDelete(args._id);
};
