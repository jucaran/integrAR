import path from "path";
import { createWriteStream } from "fs";
import Class from "../models/Class";

export const getClasses = async () => {
  return await Class.find();
};

export const uploadClassFile = async (_, { file, classId }) => {
  const { createReadStream, filename } = await file;
  console.log("_id: ", classId);
  const filePath = path.join(__dirname, "../uploads/", filename);

  const _class = await Class.findById(classId);

  if (!_class) return { status: false };

  _class.files.push(`${filename}`);
  _class.save();

  await new Promise((res, rej) =>
    createReadStream()
      .pipe(createWriteStream(filePath))
      .on("error", function (err) {
        console.log(err);
        rej;
      })
      .on("close", res)
  );

  return {
    status: true,
  };
};
