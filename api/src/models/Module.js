import { Schema, model } from "mongoose";

const moduleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  classes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Class",
      autopopulate: true,
    },
  ],
  test: {
    type: String,
  },
});

moduleSchema.plugin(require("mongoose-autopopulate"));

export default model("Module", moduleSchema);
