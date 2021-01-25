// Query
export const allTeachers = async (parent, args, { Teacher }) => {
  // (args._id) ?  await Teacher.find({ _id: args._id }) : (args.dni) ? await Teacher.find({ dni: args.dni })
  if (args._id) {
    return await Teacher.find({ _id: args._id });
  } else if (args.dni) {
    return await Teacher.find({ dni: args.dni });
  } else {
    return await Teacher.find();
  }
}

// Mutations
export const createTeacher = async (_, args, ctx) => {
  return await new ctx.Teacher(args.input).save();
}

export const editTeacher = async (_, args, ctx) => {
  return await ctx.Teacher.findByIdAndUpdate(
    args._id,
    { $push: args.input },
    { new: true }
  );
}

export const deleteTeacher = async (_, args, ctx) => {
  return await ctx.Teacher.findByIdAndDelete(args._id);
}