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
    starts: {
      type: Number,
      require: true,
    },
    id_categorie: {
      ref: "Categories",
      type: Schema.Types.ObjectId,
      require: true,
    },
    image: {
      publicId: {
        type: String,
      },
      secureUrl: {
        type: String,
      },
    },
    imageBackground: {
      publicId: {
        type: String,
      },
      secureUrl: {
        type: String,
      },
    },
  },
  {
    versionKey: false,
  }
);

export default model("Product", productSchema);