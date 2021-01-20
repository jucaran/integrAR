import mongoose from "mongoose";
const Schema = mongoose.Schema;

const profesorSchema = new Schema({
  perfil: {
    foto: String,
    nombre: String,
    direccion: String,
    email: String,
    nacimiento: String,
    telefono: String,
  },
  grados: [{ type: Schema.type.ObjectId, ref: "Grado" }],
  alumnos: [{ type: Schema.type.ObjectId, ref: "Alumno" }],
});

const Profesor = mongoose.model("Profesor", profesorSchema),

export default Profesor
