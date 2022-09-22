import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema({
  username: String,
  hashedPassword: String,
});

// instance
UserSchema.methods.setPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10);
  this.hashedPassword = hash;
};

UserSchema.methods.checkPassword = async function (password) {
  const result = await bcrypt.compare(password, this.hashedPassword);
  return result;
};

UserSchema.methods.serialize = function (password) {
  const data = this.toJSON();
  delete data.hashedPassword;
  return data;
};

// static
UserSchema.statics.findByUsername = async function (username) {
  return await this.findOne({ username }).exec();
};

const user = mongoose.model("User", UserSchema);

export default user;
