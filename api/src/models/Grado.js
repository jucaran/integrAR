import mongoose from "mongoose";
const Schema = mongoose.Schema;

const gradoSchema = new Schema({
  // materias: [{ type: Schema.type.ObjectId, ref: "Materia"}],
  materias: [
    {
      profesor: { type: Schema.Types.ObjectId, ref: "Profesor" },
      alumnos: [{ type: Schema.Types.ObjectId, ref: "Alumno" }],
      clases: [
        {
          contenidos: [
            {
              tarea: String,
              correcciones: String,
              examen: String,
            },
          ],
        },
      ],
    },
  ],
});

export default mongoose.model("Grado", gradoSchema);
