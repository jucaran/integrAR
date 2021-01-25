// Query
export const allCourses= async (parent, args, ctx) => {
  if (args._id) {
    return await ctx.Course.find({ _id: args._id });
  } else {
    return await ctx.Course.find();
  }
}

// Mutation
export const createCourse= async (_, args, ctx) => {
  return await new ctx.Course(args.input).save();
}

export const editCourse= async (_, args, ctx) => {
  return await ctx.Course.findByIdAndUpdate(
    args._id,
    { $push: args.input },
    { new: true }
  );
}

export const deleteCourse= async (_, args, ctx) => {
  return await ctx.Course.findByIdAndDelete(args._id);
}