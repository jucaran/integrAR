import Student from "../models/Student";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { sendMailWithPassword } from "../mail";

// Query
export const allStudents = async (_, args, ctx) => {
  if (args._id) {
    return await Student.find({ _id: args._id });
  } else if (args.dni) {
    return await Student.find({ dni: args.dni });
  } else {
    return await Student.find();
  }
};

// Mutations
export const createStudent = async (_, args, ctx) => {
  let newStudent = await new Student(args.input).save();
  const CourseId = args.input.course;

  if (CourseId) {
    const course = await Course.findById(CourseId);
    course && course.students.push(newStudent._id);
    course && (await course.save());
  }

  const password = Math.floor(100000 + Math.random() * 900000).toString();
  const hash = await bcrypt.hash(password, 12);
  const { name, email, dni } = args.input;

  let studentUser = await new User({
    name,
    email,
    dni,
    password: hash,
    role: "Student",
  }).save();

  const [isMailSent, error] = await sendMailWithPassword(studentUser, password);

  if (!isMailSent) return error;

  return newStudent;
};

export const editStudent = async (_, args, ctx) => {
  // return await Student.findByIdAndUpdate(
  //   args._id,
  //   { $push: args.input },
  //   { new: true }
  // );
  /**
   * TODO: cuando se le agregue un estudiante a un curso, se le agregue ese curso al estudiante puto ese
   */
  let student = await Student.findById(args._id);

  let inputs = args.input;
  for (const key in inputs) {
    key ? (student[key] = inputs[key]) : student[key];
  }

  await student.save();

  return student;
};

export const deleteStudent = async (_, args, ctx) => {
  return await Student.findByIdAndDelete(args._id);
};
