// Query
export const admin = async (parent, args, { Admin }) => {
  return await Admin.find();
}

// Mutations
export const createAdmin = async (_, args, ctx) => {
  return await new ctx.Admin(args.input).save();
}

export const editAdmin = async (_, args, ctx) => {
  return await ctx.Admin.findByIdAndUpdate(
    args._id, args.input, {
    new: true,
  });
}

export const deleteAdmin = async (_, args, ctx) => {
  return await ctx.Admin.findByIdAndDelete(args._id);
}