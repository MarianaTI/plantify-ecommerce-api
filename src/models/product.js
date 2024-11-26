import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    stars: {
      type: Number,
      require: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model("Product", productSchema);
