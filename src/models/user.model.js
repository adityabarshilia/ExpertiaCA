import { model, Schema, models } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tasks: {
    type: Array,
    default: [],
  },
});

const UserModel = models.user || model("user", UserSchema); //check if model exists
export { UserModel };
