// Query
export const allStudents = async (parent, args, ctx) => {
  if (args._id) {
    return await ctx.Student.find({ _id: args._id });
  } else if (args.dni) {
    return await ctx.Student.find({ dni: args.dni });
  } else {
    return await ctx.Student.find();
  }
}

// Mutations
export const createStudent = async (_, args, ctx) => {
  return await new ctx.Student(args.input).save();
}

export const editStudent = async (_, args, ctx, req) => {
  if (!req.isAuth) {
    throw new Error('Unauthenticated!');
  }
  return await ctx.Student.findByIdAndUpdate(
    args._id,
    { $push: args.input },
    { new: true }
  );
}

export const deleteStudent = async (_, args, ctx) => {
  return await ctx.Student.findByIdAndDelete(args._id);
}