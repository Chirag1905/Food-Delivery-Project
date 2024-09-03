import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodsModel";
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
    const id = response.params.id;
    let success = false;
    const details = await restaurantSchema.findOne({ _id: id });
    const foodItems = await foodSchema.find({ resto_id: id });
    if (details && foodItems) {
      success = true;
    }
    return NextResponse.json({ success, details, foodItems });
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
