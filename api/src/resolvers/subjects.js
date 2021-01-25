// Query
export const allSubjects = async (parent, args, ctx) => {
  if (args._id) {
    return await ctx.Subject.find({ _id: args._id });
  } else {
    return await ctx.Subject.find();
  }
}

// Mutations
export const createSubject = async (_, args, ctx) => {
  return await new ctx.Subject(args.input).save();
}

export const editSubject = async (_, args, ctx) => {
  return await ctx.Subject.findByIdAndUpdate(
    args._id,
    { $push: args.input },
    { new: true }
  );
}

export const deleteSubject = async (_, args, ctx) => {
  return await ctx.Subject.findByIdAndDelete(args._id);
}