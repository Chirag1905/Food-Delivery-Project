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

export async function GET() {
  try {
    await connectToDatabase();
    const data = await restaurantSchema.find();
    console.log(data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function POST(request) {
  try {
    let payload = await request.json();
    let result;
    let success = false;

    await connectToDatabase();

    if (payload.login) {
      result = await restaurantSchema.findOne({
        email: payload.email,
        password: payload.password,
      });
      if (result) {
        success = true;
      }
    } else {
      const restaurant = new restaurantSchema(payload);
      result = await restaurant.save();
      if (result) {
        success = true;
      }
    }

    return NextResponse.json({ result, success });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
