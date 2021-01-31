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
