export const uploadCsv = (_, { file }) => {
  console.log(file);
  return {
    status: true,
  };
};
