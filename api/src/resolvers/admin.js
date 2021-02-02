import Admin from "../models/Admin";

// Query
export const admin = async (_, args, ctx) => {
  return await Admin.find();
}

// Mutations
export const createAdmin = async (_, args, ctx) => {
  return await new Admin(args.input).save();
}

export const editAdmin = async (_, args, ctx) => {

  let admin = await Admin.findById(args._id)
  let inputs = args.input
  for (const key in inputs) {
    key ? (admin[key] = input[key]) : admin[key];
  }
  // args.input.name ? (admin.name = args.input.name) : null
  // args.input.lastname ? (admin.lastname = args.input.lastname) : null
  // args.input.dni ? (admin.dni = args.input.dni) : null
  // args.input.email ? (admin.email = args.input.email) : null
  // args.input.whatsapp ? (admin.whatsapp = args.input.whatsapp) : null
  // args.input.address ? (admin.address = args.input.address) : null
  // args.input.birthday ? (admin.birthday = args.input.birthday) : null
  // args.input.picture ? (admin.picture = args.input.picture) : null

  // args.input.courses ? (admin.courses = args.input.courses) : null
  // args.input.grades ? (admin.grades = args.input.grades) : null
  // args.input.teachers ? (admin.teachers = args.input.teachers) : null
  // args.input.students ? (admin.students = args.input.students) : null
  // args.input.subjects ? (admin.subjects = args.input.subjects) : null

  await admin.save()

  return admin


  // return await Admin.findByIdAndUpdate(
  //   args._id, args.input, {
  //   new: true,
  // });
}

export const deleteAdmin = async (_, args, ctx) => {
  return await Admin.findByIdAndDelete(args._id);
}