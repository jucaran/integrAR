import Module from "../models/Module";

export const getModules = async () => {
  return await Module.find();
};
