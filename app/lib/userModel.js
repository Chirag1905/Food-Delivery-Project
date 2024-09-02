const { default: mongoose } = require("mongoose");

const userModel = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  address: String,
  city: String,
  contact: String,
});

export const usersSchema =
  mongoose.models.users || mongoose.model("users", userModel);
