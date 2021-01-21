import { Schema, model } from "mongoose"

const teacherSchema = new Schema({
  name: {
    type: String,
    required: true
  }, 
  lastname: String,
  email: String,
  whatsapp: String,
  
})

// Compile model from schema
export default model("teachers", teacherSchema)