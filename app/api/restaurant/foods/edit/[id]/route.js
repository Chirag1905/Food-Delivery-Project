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

export async function GET(request, response) {
  try {
    await connectToDatabase();
    const id = response.params.id;
    let success = false;
    const result = await foodSchema.findOne({ _id: id });
    if (result) {
      success = true;
    }
    return NextResponse.json({ success, result });
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function PUT(request, response) {
  try {
    await connectToDatabase();
    const id = response.params.id;
    const payload = await request.json();
    let success = false;
    const result = await foodSchema.findOneAndUpdate({ _id: id }, payload);
    if (result) {
      success = true;
    }
    return NextResponse.json({ success, result });
  } catch (error) {
    console.error("Error in PUT request:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
