import Teacher from "../models/Teacher";
import Course from "../models/Course";
import Subject from "../models/Subject";
import User from "../models/User";
import { sendMailWithPassword } from "../mail";

// Query
export const allTeachers = async (_, args, ctx) => {
  if (args._id) {
    return await Teacher.find({ _id: args._id });
  } else if (args.dni) {
    return await Teacher.find({ dni: args.dni });
  } else {
    return await Teacher.find();
  }
};

// Mutations
export const createTeacher = async (_, args, ctx) => {
  let newTeacher = await new Teacher(args.input).save();
  let teacherUser = await new User(args.input).save();
  const teacherCourses = args.input.courses;
  const teacherSubjects = args.input.subjects;

  teacherSubjects &&
    teacherSubjects.map(async (el) => {
      const subject = await Subject.findById(el._id);
      if (subject) {
        subject.teacher = newTeacher._id;
        await subject.save();
      }
    });
  teacherCourses &&
    teacherCourses.map(async (el) => {
      const course = await Course.findById(el._id);
      if (course) {
        course.teachers.push(newTeacher._id);
        await course.save();
      }
    });

  teacherUser.role = "Teacher";
  const password = Math.floor(100000 + Math.random() * 900000);
  teacherUser.password = await bcrypt.hash(password, 12);
  await teacherUser.save();

  const [isMailSent, error] = await sendMailWithPassword(teacherUser, password);

  if (!isMailSent) return error;

  return newTeacher;
};

export const editTeacher = async (_, args, ctx) => {
  let teacher = await Teacher.findById(args._id);

  const input = args.input;
  for (const key in input) {
    key ? (teacher[key] = input[key]) : null;
  }

  await teacher.save();
};

export const deleteTeacher = async (_, args, ctx) => {
  return await Teacher.findByIdAndDelete(args._id);
};
