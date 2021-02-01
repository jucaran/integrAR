import Grade from "../models/Grade";

//Query
export const allGrades = async (_, args, ctx) => {
  if (args._id) {
    return await Grade.find({ _id: args._id });
  } else {
    return await Grade.find().sort({name: 1})
  }
}

// Mutations
export const createGrade = async (_, args, ctx) => {
  return await new Grade(args.input).save();
}

// args.input.dni ? (teacher.dni = args.input.dni) : null
// let teacher = await Teacher.findById(args._id)

export const editGrade = async (parent, args, ctx) => {
  let grade = await Grade.findById(args._id)

  let inputs = args.input;
  for (const key in inputs) {
    key ? (grade[key] = inputs[key]) : grade[key]
  }

  // args.input.name ? (grade.name = args.input.name) : null
  // args.input.courses ? (grade.courses = args.input.courses) : null
  // args.input.teachers ? (grade.teachers = args.input.teachers) : null 
  // args.input.subjects ? (grade.subjects = args.input.subjects) : null
  // args.input.students ? (grade.students = args.input.students) : null

  await grade.save()

  return grade
  // return await Grade.findByIdAndUpdate(
  //   args._id,
  //   { $push: args.input },
  //   { new: true, useFindAndModify: false }
  // );
}

export const deleteGrade = async (_, args, ctx) => {
  return await Grade.findByIdAndDelete(args._id);
}