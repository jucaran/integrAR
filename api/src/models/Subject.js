import { Schema, model } from "mongoose"

const subjectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  teacher: [{
    type: Schema.Types.ObjectId,
    ref: "Teacher",
    autopopulate: true
  }],
  
})

subjectSchema.plugin(require('mongoose-autopopulate'));

export default model("Subject", subjectSchema)