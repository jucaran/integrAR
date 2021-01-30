import Subject from "../models/Subject";
import Course from "../models/Course";

// Query
export const allSubjects = async (_, args, ctx) => {
  if (args._id) {
    return await Subject.find({ _id: args._id });
  } else {
    return await Subject.find();
  }
};

// Mutations
export const createSubject = async (_, args, ctx) => {
  const newSubject = await new Subject(args.input).save();

  let course = await Course.findById(args.input.course);
  course && course.subjects.push(newSubject._id);
  course && (await course.save());

  return newSubject;
};

export const editSubject = async (_, args, ctx) => {

  let subject = await Subject.findById(args._id);

  let inputs = args.input;
  for (const key in inputs) {
    key ? subject[key] = inputs[key] : null
  }
  // args.input.name ? (subject.name = args.input.name) : null;
  // args.input.courses ? (subject.courses = args.input.courses) : null
  // args.input.teacher ? (subject.teacher = args.input.teacher) : null;
  // args.input.class ? (subject.class = args.input.class) : null

  await subject.save();

  return subject;
};

export const deleteSubject = async (_, args, ctx) => {
  return await Subject.findByIdAndDelete(args._id);
};
