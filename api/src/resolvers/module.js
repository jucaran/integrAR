import Module from "../models/Module";

export const getModules = async (_, { _id }) => {
  if (_id) {
    return await Module.find({ _id });
  } else {
    return await Module.find();
  }
};
