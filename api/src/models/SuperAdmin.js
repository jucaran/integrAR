import { Schema, model } from "mongoose"

const superAdminSchema = new Schema({
  name: {
    type: String,
    required: true
  }, 
  lastname: String,
  email: String,
  whatsapp: String,
})

// Compile model from schema
export default model("superAdmin", superAdminSchema)