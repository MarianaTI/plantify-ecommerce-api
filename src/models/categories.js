import { Schema, model } from "mongoose";

export const categorieSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export default model("Categories", categorieSchema);
