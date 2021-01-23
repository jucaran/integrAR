import { Schema, model } from "mongoose"

// Grado -> Primer año
const gradeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  courses: [{
    type: Schema.Types.ObjectId,
    ref: "Course",
    autopopulate: true
  }]
})

gradeSchema.plugin(require('mongoose-autopopulate'));

// Compile model from schema
export default model("Grade", gradeSchema)