import Module from "../models/Module";
import Subject from "../models/Subject";

export const getModules = async (_, { _id }) => {
  if (_id) {
    return await Module.find({ _id });
  } else {
    return await Module.find();
  }
};

export const createModule = async (_, { input }) => {
  const newModule = await new Module(input).save()
  console.log("Llego acá unidades: ", input)

  const subject = await Subject.findById(input.subject);
  subject && subject.modules.push(newModule._id);
  subject && (await subject.save())

  return newModule;


  // console.log("Input back: ", input)
  // await new Module(input).save();
}
export const editModule = async (_, { _id, input }) => {
  let newModule = await Module.findById(_id);

  if (!newModule) return false;

  for (const key in input) {
    key ? (newModule[key] = input[key]) : null;
  }

  // newModule.classes.push()
  await newModule.save();
  
  return newModule;
};

export const deleteModule = async (_, { _id }) =>
  await Module.findByIdAndDelete(_id);
