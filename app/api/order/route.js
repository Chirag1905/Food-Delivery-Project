import { connectionStr } from "@/app/lib/db";
import { orderSchema } from "@/app/lib/orderModel";
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
    let payload = await request.json();
    let result;
    let success = false;
    await connectToDatabase();
    const user = new orderSchema(payload);
    result = await user.save();
    if (result) {
      success = true;
    }
    return NextResponse.json({ result, success });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
