import { connectionStr } from "@/app/lib/db";
import { deliveryPartnerSchema } from "@/app/lib/deliverypartnerModel";
import { orderSchema } from "@/app/lib/orderModel";
import { restaurantSchema } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

async function connectToDatabase() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(connectionStr);
    console.log("Connected to MongoDB");
  }
}

export async function GET(request, response) {
  try {
    await connectToDatabase();
    let city = request.params.city;
    let success = false;
    let fliter = { city: { $regex: new RegExp(city, "i") } };
    const result = await deliveryPartnerSchema.find(fliter);
    if (result) {
      success = true;
    }
    return NextResponse.json({ success, result });
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
