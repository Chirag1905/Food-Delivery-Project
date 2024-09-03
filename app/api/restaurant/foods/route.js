import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

async function connectToDatabase() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(connectionStr);
    console.log("Connected to MongoDB");
  }
}

export async function POST(request, response) {
  try {
    await connectToDatabase();
    let payload = await request.json();
    let success = false;
    const food = new foodSchema(payload);
    const result = await food.save();
    if (result) {
      success = true;
    }
    return NextResponse.json({ success, result });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
