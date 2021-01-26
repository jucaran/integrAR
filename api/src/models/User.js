import { Schema, model } from "mongoose";

const userSchema = new Schema({
    dni: { 
      type: Number, 
      required: true, 
      // unique: true ---> Ver la nueva 
    },
    name: {
      type: String, 
      required: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    email: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);
userSchema.plugin(require("mongoose-autopopulate"));

export default model("user", userSchema);