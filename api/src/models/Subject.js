import { Schema, model } from "mongoose";

const subjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    autopopulate: true,
  },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
    autopopulate: true,
  },
  classes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Class",
      autopopulate: true,
    },
  ],
});

subjectSchema.plugin(require("mongoose-autopopulate"));

export default model("Subject", subjectSchema);
