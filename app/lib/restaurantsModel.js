const { default: mongoose } = require("mongoose");

const restaurantModel = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  address: String,
  city: String,
  contact: String,
  logo: String,
});

export const restaurantSchema =
  mongoose.models.restaurants || mongoose.model("restaurants", restaurantModel);
