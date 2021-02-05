import Student from "../models/Student";
import Course from "../models/Course";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { sendMailWithPassword } from "../mail";
import Teacher from "../models/Teacher";

export const createStudentsWithCsv = async (_, { file, courseId }) => {
  const { createReadStream, filename, mimetype, encoding } = await file;
  const stream = createReadStream();
  let fileBuffer = [];

  // Adds every peace of the file stream to a big array of "chunks"
  stream.on("data", function (chunk) {
    fileBuffer = [...fileBuffer, chunk];
  });

  stream.on("end", async function () {
    // Puts together the array of "chunks", parces it as a string and cuts it in rows
    const rows = Buffer.concat(fileBuffer)
      .toString("utf8")
      .split("\r\n")
      .slice(1);

    // Returns a promise for each student in the .csv file
    const studentPromises = rows.map((row) => {
      // We grab the elements in order and add them as atribute to create each student
      const [
        name,
        lastname,
        dni,
        email,
        whatsapp,
        address,
        birthday,
      ] = row.split(",");
      return new Student({
        name,
        lastname,
        dni,
        email,
        whatsapp,
        address,
        birthday,
        course: courseId ? courseId : null,
      }).save();
    });

    // If any of the promises is rejected the hole Promise.all will be
    // If none is rejected it returns an array with all the students created
    const students = await Promise.all(studentPromises);

    // Once the Promise all is finished we add each student to the course given by args
    if (courseId) {
      const course = await Course.findById(courseId);
      if (course) {
        students.forEach(async (student) => {
          course.students.push(student._id);
        });
        await course.save();
      }
    }

    const passwords = [];
    // Creating the users for each student
    const usersPromises = students.map(async ({ dni, name, email }) => {
      const password = Math.floor(100000 + Math.random() * 900000).toString();
      passwords.push(password);
      const hash = await bcrypt.hash(password, 12);

      console.log(`The password for dni ${dni} (Student) is: `, password);

      return new User({
        dni,
        name,
        email,
        password: hash,
        role: "Student",
      }).save();
    });

    const users = await Promise.all(usersPromises);

    users.forEach(async (user, i) => {
      const [isMailSent, error] = await sendMailWithPassword(
        user,
        passwords[i]
      );

      if (!isMailSent) {
        console.log(error);
        return {
          status: false,
        };
      }
    });

    return {
      status: true,
    };
  });
};

export const createTeachersWithCsv = async (_, { file }) => {
  const { createReadStream, filename, mimetype, encoding } = await file;
  const stream = createReadStream();
  let fileBuffer = [];

  // Adds every peace of the file stream to a big array of "chunks"
  stream.on("data", function (chunk) {
    fileBuffer = [...fileBuffer, chunk];
  });

  stream.on("end", async function () {
    // Puts together the array of "chunks", parces it as a string and cuts it in rows
    const rows = Buffer.concat(fileBuffer)
      .toString("utf8")
      .split("\r\n")
      .slice(1);

    // Returns a promise for each student in the .csv file
    const teacherPromises = rows.map((row) => {
      // We grab the elements in order and add them as atribute to create each student
      const [
        name,
        lastname,
        dni,
        email,
        whatsapp,
        address,
        birthday,
      ] = row.split(",");
      return new Teacher({
        name,
        lastname,
        dni,
        email,
        whatsapp,
        address,
        birthday,
      }).save();
    });

    // If any of the promises is rejected the hole Promise.all will be
    // If none is rejected it returns an array with all the students created
    const teachers = await Promise.all(teacherPromises);

    const passwords = [];
    // Creating the users for each student
    const usersPromises = teachers.map(async ({ dni, name, email }) => {
      const password = Math.floor(100000 + Math.random() * 900000).toString();
      passwords.push(password);
      const hash = await bcrypt.hash(password, 12);

      console.log(`The password for dni ${dni} (Teacher) is: `, password);

      return new User({
        dni,
        name,
        email,
        password: hash,
        role: "Teacher",
      }).save();
    });

    const users = await Promise.all(usersPromises);

    users.forEach(async (user, i) => {
      const [isMailSent, error] = await sendMailWithPassword(
        user,
        passwords[i]
      );

      if (!isMailSent) {
        console.log(error);
        return {
          status: false,
        };
      }
    });

    return {
      status: true,
    };
  });
};
