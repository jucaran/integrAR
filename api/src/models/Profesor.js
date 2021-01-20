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
  grados: [{ type: Schema.Types.ObjectId, ref: "Grado" }],
  alumnos: [{ type: Schema.Types.ObjectId, ref: "Alumno" }],
});

export default mongoose.model("Profesor", profesorSchema);
