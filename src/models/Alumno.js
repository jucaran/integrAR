import mongoose from "mongoose";
const Schema = mongoose.Schema;

const alumnoSchema = new Schema({
  perfil: {
    foto: String,
    nombre: String,
    direccion: String,
    email: String,
    nacimiento: String,
    telefono: String,
  },
  grado: { type: Schema.type.ObjectId, ref: "Grado" },
  profesores: [{ type: Schema.type.ObjectId, ref: "Profesor" }],
});

const Alumno = mongoose.model("Alumno", alumnoSchema),

export default Alumno
