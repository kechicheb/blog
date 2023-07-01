import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true, min: 4, unique: true },
  password: { type: String, required: true },
});

export default models.User || model("User", userSchema);
