import { connectionStr } from "@/app/lib/db";
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
    let queryParams = request.nextUrl.searchParams;
    let success = false;
    let filter = {};
    if (queryParams.get("location")) {
      let city = queryParams.get("location");
      filter = { city: { $regex: new RegExp(city, "i") } };
    } else if (queryParams.get("restaurant")) {
      let name = queryParams.get("restaurant");
      filter = { name: { $regex: new RegExp(name, "i") } };
    }
    const result = await restaurantSchema.find(filter);
    if (result) {
      success = true;
    }
    return NextResponse.json({ success, result });
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
