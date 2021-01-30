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
  class: [
    {
      type: String,
      // required: true,
      content: [
        {
          type: String,
          // required: true,
          homework: {
            type: String,
            // required: true
          },
          correction: {
            type: String,
            // required: true
          },
          test: {
            type: String,
            // required: true
          },
        },
      ],
    },
  ],
});

subjectSchema.plugin(require("mongoose-autopopulate"));

export default model("Subject", subjectSchema);
