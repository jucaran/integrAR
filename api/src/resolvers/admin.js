import Admin from "../models/Admin";

// Query
export const admin = async (_, args, ctx) => {
  return await Admin.find();
};

// Mutations
export const createAdmin = async (_, args, ctx) => {
  return await new Admin(args.input).save();
};

export const editAdmin = async (_, args, ctx) => {
  let admin = await Admin.findById(args._id);
  let inputs = args.input;
  for (const key in inputs) {
    key ? (admin[key] = input[key]) : admin[key];
  }

  await admin.save();

  return admin;

  // return await Admin.findByIdAndUpdate(
  //   args._id, args.input, {
  //   new: true,
  // });
};

export const deleteAdmin = async (_, args, ctx) => {
  return await Admin.findByIdAndDelete(args._id);
};
