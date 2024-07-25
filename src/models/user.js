import { Schema, model } from "mongoose";

export const userSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
    versionKey: false
});

export default model('User', userSchema);