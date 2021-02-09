import path from "path";
import fs from "fs";
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
    if (key == "corrections") {
      _class[key].push(input[key]);
    } else {
      key ? (_class[key] = input[key]) : null;
    }
  }

  await _class.save();
  return _class;
};

export const deleteClass = async (_, { _id }) => {
  //TODO: cuando borre una clase, borrar su modulo y borrar sus subjects

  return await Class.findByIdAndDelete(_id);
};

/**
 * This resolver receives a class id and a file and uploads it to the
 * /uploads/teachers/:classId folder in the server
 * also it pushes the file name to the "files" atribute of Class model
 * so in the front we can call it to download it
 */
export const uploadClassFile = async (_, { file, classId }) => {
  const { createReadStream, filename } = await file;
  const fileDir = path.join(__dirname, "../uploads", "teachers", classId);

  const _class = await Class.findById(classId);

  if (!_class) return { status: false };

  _class.files.push(filename);
  _class.save();

  if (!fs.existsSync(fileDir)) {
    fs.mkdirSync(fileDir);
  }

  await new Promise((res) =>
    createReadStream()
      .pipe(fs.createWriteStream(path.join(fileDir, filename)))
      .on("error", function (err) {
        console.log(err);
      })
      .on("close", res)
  );

  return {
    status: true,
  };
};

/**
 *  Deletes a class file of the mongo document, also deletes the file from the server
 */
export const deleteClassFile = async (_, { classId, filename }) => {
  const _class = await Class.findById(classId);
  if (!_class) return false;

  _class.files = _class.files.filter((file) => file !== filename);
  await _class.save();

  const dirPath = path.join(__dirname, "..", "uploads", "teachers", classId);
  if (fs.existsSync(dirPath)) {
    try {
      // Deletes the file from server
      fs.unlink(path.join(dirPath, filename));
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  return true;
};

/**
 * This resolver receives a class id, a dni, and a file and uploads it to the
 * /uploads/students/:classId folder in the server
 * also it pushes the file name to the "deliveries" atribute of Class model
 * so in the front we can call it to download it
 */
export const uploadDelivery = async (_, { file, classId, dni }) => {
  const { createReadStream, filename } = await file;
  const fileDir = path.join(__dirname, "../uploads", "students", classId);
  const fileType = filename.split(".").pop();

  const _class = await Class.findById(classId);

  if (!_class) return { status: false };

  _class.deliveries.push(`${dni}.${fileType}`);
  _class.save();

  if (!fs.existsSync(fileDir)) {
    fs.mkdirSync(fileDir);
  }

  await new Promise((res) =>
    createReadStream()
      .pipe(fs.createWriteStream(path.join(fileDir, `${dni}.${fileType}`)))
      .on("error", function (err) {
        console.log(err);
      })
      .on("close", res)
  );

  return {
    status: true,
  };
};

/**
 *  Deletes a delivery of the class, also deletes the file from the server
 */
export const deleteDelivery = async (_, { classId, filename }) => {
  const _class = await Class.findById(classId);
  if (!_class) return false;

  // Deletes the file from the mongo document
  _class.deliveries = _classs.deliveries.filter(
    (delivery) => delivery !== filename
  );
  await _class.save();

  const dirPath = path.join(__dirname, "..", "uploads", "students", classId);
  if (fs.existsSync(dirPath)) {
    try {
      // Deletes the file from the server
      fs.unlink(path.join(dirPath, filename));
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  return true;
};

/* This resolver receives a class id and a file and uploads it to the
 * /uploads/teachers/:classId folder in the server
 * also it adds the file name to the "homework" atribute of Class model
 * so in the front we can call it to download it
 */
export const uploadHomework = async (_, { file, classId }) => {
  const { createReadStream, filename } = await file;
  const fileDir = path.join(__dirname, "../uploads", "teachers", classId);

  const _class = await Class.findById(classId);
  if (!_class) return { status: false };

  _class.homework = filename;
  _class.save();

  if (!fs.existsSync(fileDir)) {
    fs.mkdirSync(fileDir);
  }

  await new Promise((res) =>
    createReadStream()
      .pipe(fs.createWriteStream(path.join(fileDir, filename)))
      .on("error", function (err) {
        console.log(err);
      })
      .on("close", res)
  );

  return {
    status: true,
  };
};

/**
 *  Deletes a homework of the class, also deletes the homework file from the server
 */
export const deleteHomework = async (_, { classId, filename }) => {
  const _class = await Class.findById(classId);
  if (!_class) return false;

  _class.homework = null;
  await _class.save();

  const dirPath = path.join(__dirname, "..", "uploads", "teachers", classId);
  if (fs.existsSync(dirPath)) {
    try {
      // Deletes file from the server
      fs.unlink(path.join(dirPath, filename));
    } catch (err) {
      console.log(err);
      return false;
    }
  }
  return true;
};

//TODO: agregar un resolver para modificar la correction de una clase y poder modificar la nota de un alumno o el feedback
