import path from "path";
import { createWriteStream } from "fs";
import Class from "../models/Class";

export const uploadCsv = async (_, { file }) => {
  // console.log(file);
  const { createReadStream, filename, mimetype, encoding } = await file;
  const stream = createReadStream();
  let fileBuffer = [];

  stream.on("data", function (chunk) {
    fileBuffer = [...fileBuffer, chunk];
  });

  stream.on("end", function () {
    const rows = Buffer.concat(fileBuffer).toString("utf8").split("\r\n");

    const fields = rows.map((el) => el.split(","));

    console.log(fields);

    return {
      status: true,
    };
  });
};

export const uploadClassFile = async (_, { file, classId }) => {
  const { createReadStream, filename } = await file;
  console.log("_id: ", classId);
  const filePath = path.join(__dirname, "../uploads/", filename);

  const _class = await Class.findById(classId);

  if (!_class) return { status: false };

  _class.files.push(`../uploads/${filename}`);
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
