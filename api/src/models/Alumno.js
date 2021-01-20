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
  grado: { type: Schema.Types.ObjectId, ref: "Grado" },
  profesores: [{ type: Schema.Types.ObjectId, ref: "Profesor" }],
});

export default mongoose.model("Alumno", alumnoSchema);

// export default Alumno
