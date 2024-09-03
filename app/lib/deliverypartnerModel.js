const { default: mongoose } = require("mongoose");

const deliveryPartnerModel = new mongoose.Schema({
  name: String,
  contact: String,
  password: String,
  address: String,
  city: String,
});

export const deliveryPartnerSchema =
  mongoose.models.deliverypartners || mongoose.model("deliverypartners", deliveryPartnerModel);
