import Class from "../models/Class";

export const getClasses = async () => {
  return await Class.find();
};
