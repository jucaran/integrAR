import { Schema, model } from "mongoose"

// Curso --> 1° A
const courseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  grade: [{
    type: Schema.Types.ObjectId,
    ref: "Grade",
    autopopulate: true
  }]
})

courseSchema.plugin(require('mongoose-autopopulate'));

// Compile model from schema
export default model("Course", courseSchema)