import Teacher from "../models/Teacher";
import Course from "../models/Course";
import Subject from "../models/Subject";

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
  const teacherCourses = args.input.courses;
  const teacherSubjects = args.input.subjects;

  if (teacherCourses) {
    teacherCourses.map(async (el) => {
      const course = await Course.findById(el._id);
      course && course.teachers.push(newTeacher._id);
      course && (await course.save());
    });
  }

  if (teacherSubjects) {
    teacherSubjects.map(async (el) => {
      const subject = await Subject.findById(el._id);
      if (subject) {
        subject.teacher = newTeacher._id;
      }
      subject && (await subject.save());
    });
  }

  return newTeacher;
};

export const editTeacher = async (_, args, ctx) => {
  // return await Teacher.findOneAndUpdate({ _id: args._id},
  //   { $push: args.input },
  //   { new: true }
  // )
  let newTeacher = await new Teacher(args.input).save();
  let newUser = await new User(args.input).save();
  const teacherCourses = args.input.courses;
  const teacherSubjects = args.input.subjects;

  let teacher = await Teacher.findById(args._id);

  args.input.name ? (teacher.name = args.input.name) : null;
  args.input.lastname ? (teacher.lastname = args.input.lastname) : null;
  args.input.dni ? (teacher.dni = args.input.dni) : null;
  args.input.email ? (teacher.email = args.input.email) : null;
  args.input.whatsapp ? (teacher.whatsapp = args.input.whatsapp) : null;
  args.input.address ? (teacher.address = args.input.address) : null;
  args.input.birthday ? (teacher.birthday = args.input.birthday) : null;
  args.input.picture ? (teacher.picture = args.input.picture) : null;

  args.input.grades ? (teacher.grades = args.input.grades) : null;
  args.input.courses ? (teacher.courses = args.input.courses) : null;
  args.input.student ? (teacher.student = args.input.student) : null;
  args.input.subjects ? (teacher.subjects = args.input.subjects) : null;

  await teacher.save();

  if (teacherCourses) {
    teacherCourses.map(async (el) => {
      const course = await Course.findById(el._id);
      course && course.teachers.push(newTeacher._id);
      course && (await course.save());
    });
  }

  if (teacherSubjects) {
    teacherSubjects.map(async (el) => {
      const subject = await Subject.findById(el._id);
      if (subject) {
        subject.teacher = newTeacher._id;
      }
      subject && (await subject.save());
    });
  }

  newUser.role = "Teacher";
  const password = Math.floor(100000 + Math.random() * 900000);

  console.log("teacherUser: ", teacherUser);

  const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
  teacherUser.password = hashedPassword;

  return newTeacher;
};

export const deleteTeacher = async (_, args, ctx) => {
  return await Teacher.findByIdAndDelete(args._id);
};
