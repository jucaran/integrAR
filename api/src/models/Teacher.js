import { Schema, model } from "mongoose"

const teacherSchema = new Schema({
  name: {
    type: String,
    required: true
  }, 
  lastname: String,
  email: String,
  whatsapp: String,
  students: Array
})

// Compile model from schema
export default model("Teacher", teacherSchema)