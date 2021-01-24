export default {
  // get
  // Falta Agregar argumento(id) para traer uno solo
  Query: {
    superAdmin: async (parent, args, { SuperAdmin }) => {
      return await SuperAdmin.find();
    },
    teachers: async (parent, args, { Teacher }) => {
      return await Teacher.find();
    },
    students: async (parent, args, ctx) => {
      return await ctx.Student.find();
    },
    grades: async (parent, args, ctx) => {
      return await ctx.Grade.find();
    },
    courses: async (parent, args, ctx) => {
      return await ctx.Course.find();
    },
    subjects: async (parent, args, ctx) => {
      return await ctx.Subject.find();
    },
    
  },

  // put, post, delete
  Mutation : {

    // PRECEPTOR POST, DELETE, PUT
    createSuperAdmin: async(_, args, ctx) => {
      return await new ctx.SuperAdmin(args.input).save();
    },
    editSuperAdmin: async (_, args, ctx) => {
      return await ctx.SuperAdmin.findByIdAndUpdate(args._id, args.input, { new: true })
    },
    deleteSuperAdmin: async(_, args, ctx) => {
      return await ctx.SuperAdmin.findByIdAndDelete(args._id);
    },

    // PROFESORES POST, DELETE, PUT
    createTeacher: async(_, args, ctx) => {
      return await new ctx.Teacher(args.input).save();
    },
    editTeacher: async (_, args, ctx) => {
      return await ctx.Teacher.findByIdAndUpdate(args._id, args.input, { new: true })
    },
    deleteTeacher: async(_, args, ctx) => {
      return await ctx.Teacher.findByIdAndDelete(args._id);
    },

    // ALUMNOS POST, DELETE, PUT
    createStudent: async(_, args, ctx) => {
      return await new ctx.Student(args.input).save();
    },
    editStudent: async (_, args, ctx) => {
      return await ctx.Student.findByIdAndUpdate(args._id, args.input, { new: true })
    },
    deleteStudent: async(_, args, ctx) => {
      return await ctx.Student.findByIdAndDelete(args._id);
    },
    
    // GRADOS
    createGrade: async(_, args, ctx) => {
      return await new ctx.Grade(args.input).save();
    },
    editGrade: async (parent, args, ctx) => {
      return await ctx.Grade.findByIdAndUpdate(args._id, {$push: args.input} , { new: true })
    },

    deleteGrade: async(_, args, ctx) => {
      return await ctx.Grade.findByIdAndDelete(args._id);
    },

    // CURSOS
    createCourse: async(_, args, ctx) => {
      return await new ctx.Course(args.input).save();
    },
    editCourse: async (_, args, ctx) => {
      return await ctx.Course.findByIdAndUpdate(args._id, args.input, { new: true })
    },
    deleteCourse: async(_, args, ctx) => {
      return await ctx.Course.findByIdAndDelete(args._id);
    },

    // MATERIAS
    createSubject: async(_, args, ctx) => {
      return await new ctx.Subject(args.input).save();
    },
    editSubject: async (_, args, ctx) => {
      return await ctx.Subject.findByIdAndUpdate(args._id, args.input, { new: true })
    },
    deleteSubject: async(_, args, ctx) => {
      return await ctx.Subject.findByIdAndDelete(args._id);
    },
    
  }
}