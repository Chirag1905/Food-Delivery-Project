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

export async function POST(request) {
  // const payload = await request.json();
  // await mongoose.connect(connectionStr);
  // const food = new foodSchema(payload);
  // const result = await food.save();
  // return NextResponse.json({ result, sucess: true });

  try {
    let payload = await request.json();
    let result;
    let success = false;

    const food = new foodSchema(payload);
    result = await food.save();
    if (result) {
      success = true;
    }
    await connectToDatabase();
    return NextResponse.json({ result, success });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
