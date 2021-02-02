import Module from "../models/Module";

export const getModules = async (_, { _id }) => {
  if (_id) {
    return await Module.find({ _id });
  } else {
    return await Module.find();
  }
};

export const createModule = async (_, { input }) =>
  await new Module(input).save();

export const editModule = async (_, { _id, input }) => {
  let newModule = await Class.findById(_id);

  if (!newModule) return false;

  for (const key in input) {
    key ? (newModule[key] = input[key]) : null;
  }

  await newModule.save();
};

export const deleteModule = async (_, { _id }) =>
  await Module.findByIdAndDelete(_id);
