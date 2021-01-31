import Student from "../models/Student"
import Course from "../models/Course"

export const createStudentsWithCsv = async (_, { file, courseId }) => {
  const { createReadStream, filename, mimetype, encoding } = await file;
  const stream = createReadStream();
  let fileBuffer = [];

  // Adds every peace of the file stream to a big array of "chunks"
  stream.on("data", function (chunk) {
    fileBuffer = [...fileBuffer, chunk];
  });

  stream.on("end", function () {
    // Puts together the array of "chunks", parces it as a string and cuts it in rows
    const rows = Buffer.concat(fileBuffer).toString("utf8").split("\r\n").slice(1);

    // Returns a promise for each student in the .csv file
    const studentPromises = rows.map(row => {
      // We grab the elements in order and add them as atribute to create each student
      const [name, lastname, dni, email, whatsapp, address, birthday] = row.split(",");
      return new Student(name, lastname, dni, email, whatsapp, address, birthday).save()
    })

    // If any of the promises is rejected the hole Promise.all will be
    // If nay is rejected it returns an array with all the students created
    students = await Promise.all(studentPromises)
    
    // Once the Promise all is finished we add each student to the course given by args
    course = await Course.findById(courseId)
    if(course) {
      students.forEach(async student => {
        course.students.push(student._id)       
        await course.save()
      });
    }

    return {
      status: true,
    };
  });
};
