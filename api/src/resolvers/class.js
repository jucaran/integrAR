import path from "path";
import { createWriteStream } from "fs";
import Class from "../models/Class";
import Module from "../models/Module";

export const getClasses = async (_, { _id }) => {
  if (_id) return await Class.find({ _id });
  else return await Class.find();
};

export const createClass = async (_, { input }) => {
  const newClass = await new Class(input).save();
  const module = await Module.findById(input.module);

  if (module) {
    module.classes.push(newClass._id);
    await module.save();
  }
  return newClass;
};

export const editClass = async (_, { _id, input }) => {
  let _class = await Class.findById(_id);

  if (!_class) return false;

  for (const key in input) {
    key ? (_class[key] = input[key]) : null;
  }

  await _class.save();
};

export const deleteClass = async (_, { _id }) =>
  await Class.findByIdAndDelete(_id);

/**
 * This resolver receives a class id and a file and uploads it to the
 * /uploads folder in the server
 * also it pushes the file name to the "files" atribute of Class model
 * so in the front we can call it to download it
 */
export const uploadClassFile = async (_, { file, classId }) => {
  const { createReadStream, filename } = await file;
  const filePath = path.join(__dirname, "../uploads/", filename);

  console.log("filename: ", filename);

  const _class = await Class.findById(classId);

  console.log("class: ", _class);

  if (!_class) return { status: false };

  _class.files.push(filename);
  _class.save();

  await new Promise((res) =>
    createReadStream()
      .pipe(createWriteStream(filePath))
      .on("error", function (err) {
        console.log(err);
      })
      .on("close", res)
  );

  return {
    status: true,
  };
};
