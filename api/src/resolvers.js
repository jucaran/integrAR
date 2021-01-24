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
    students: 
    async (parent, args, ctx) => {
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

    // logUser($dni: String!, $password: String!){
    //   logUser(dni: $dni, password: $password){
    //   token
    //   }
    // }

    // logUser: async ($dni= String, $password= String) => {
    //   await logUser(dni= $dni, password= $password)
    //   return token
    // },


    // PREFECTO POST, DELETE, PUT
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
    editGrade: async (_, args, ctx) => {
      return await ctx.Grade.findByIdAndUpdate(args._id, args.input, { new: true })
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
  


// Sprint 1

// Super Admin pueda hacer el crud completo (que pueda
// agregar profesores, editar profesores, eliminar y 
// listar profesores) -> Listo

// y que pueda agregar alumnos, editar alumnos, eliminar y
// listar alumnos -> Listo

// que pueda asociar los alumnos a los profesores -> en desarrollo
// hacer login de superadmin -> pendiente

// en el front, pantalla todos los alumnos, que cada alumno tenga 
//  tipo un select con options de profesores, y cuando seleccione un profesor,
// se le asigne ese profesor al alumno


// Ejemplo
//   
//   Pantalla alumnos del superAdmin
//   
//   Ana        <select> de grados
//                    <option> 1° 
//                    <option> 2° 
// 
//   Pablo      <select> de grados
//                    <option> Agustin Amani 
//                    <option> Franco Etcheverri 
//   

// y que al colocar la opcion, en el back haga una consulta de
// editStudent(_id: "idDelProfesor", input: {
// teachers: [el profe]
// })


  //   Pantalla de Grados
    
    // Grados                               Materias            Profesor

  //  -----                              ------------          --------

// <button> Add
    // |
    // |
    // V
// Este boton agregará
// un grado, por ej. 1°A
    





    
// pantalla ppal
// Boton Grados   <->  -Boton Materias-   1°A  grado: {lenguaje, matematica}

// Boton Profes         Boton Alumnos

// Crear Curso Anual

// 4 campos de listas desplegaables de lo que acabas de crear
//   --------    ------------   ----------   ---------
  //  1°A      lengua, mat..      Pedro
       
  //  2°A      lengua, mat..


// 2 grados, 2 profes, 2 alumnos por profesor, 2 materias (lengua, matematica), cada materia (unidad1, unidad2)





  //   1°A      Materias 1 Año      
  //                   -> Lenguaje      -> Pedro
  //                   -> Matematicas   -> Pablo

  //   1°B      Materias 1 Año
  //                   -> Lenguaje      -> Pedro
  //                   -> Matematicas   -> María

  //   2°A      Materias 2 Año
  //                   -> Lenguaje      -> Mercedes
  //                   -> Matematicas   -> Pablo
                    
  //   2°B      Materias 2 Año
  //                   -> Lenguaje      -> Mercedes
  //                   -> Matematicas   -> Maria

//  Ana -> 1°A lenguaje (Asociado el profe con sus materias)

// Pre-cargar 