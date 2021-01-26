//Query
export const allGrades = async (parent, args, ctx) => {
  if (args._id) {
    return await ctx.Grade.find({ _id: args._id });
  } else {
    return await ctx.Grade.find().sort({name: 1});
  }
}

// Mutations
export const createGrade = async (_, args, ctx) => {
  return await new ctx.Grade(args.input).save();
}

export const editGrade = async (parent, args, ctx) => {
  return await ctx.Grade.findByIdAndUpdate(
    args._id,
    { $push: args.input },
    { new: true }
  );
}

export const deleteGrade = async (_, args, ctx) => {
  return await ctx.Grade.findByIdAndDelete(args._id);
}