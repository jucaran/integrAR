import mongoose from "mongoose";
const Schema = mongoose.Schema;

const gradoSchema = new Schema({
  materias: [{ type: Schema.type.ObjectId, ref: "Materia"}],
  materias: [{
    profesor: {type: Schema.type.ObjectId, ref: "Profesor"},
    alumnos: [{type: Schema.type.ObjectId, ref: "Alumno"}],
    clases: [{
      contenidos: [{
        tarea: String,
        correcciones: String,
        examen: String
      }]
    }]
  }]
});

const Grado = mongoose.model("Grado", gradoSchema),

export default Grado
