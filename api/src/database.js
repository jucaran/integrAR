import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const { ATLAS_URL_DB } = process.env;

export async function connect() {
  try {
    await mongoose.connect(ATLAS_URL_DB,
      {
        useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false
      }
    );
    console.log(">>> DB is connected");
  } catch(err) {
    console.log("Something goes wrong");
    console.log(err)
  }
}