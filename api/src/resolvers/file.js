export const uploadCsv = async (_, { file }) => {
  // console.log(file);
  const { createReadStream, name, mimetype, encoding } = await file;
  const stream = createReadStream();
  let fileString = [];

  stream.on("data", function (chunk) {
    fileString = [...fileString, chunk];
    console.log("chunk", chunk);
  });

  stream.on("end", function () {
    console.log("File String: ", Buffer.concat(fileString));
  });

  return {
    status: true,
  };
};
