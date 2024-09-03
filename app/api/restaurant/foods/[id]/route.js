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
    const result = await foodSchema.find({ resto_id: id });
    if (result) {
      success = true;
    }
    return NextResponse.json({ success, result });
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function DELETE(request, response) {
  try {
    await connectToDatabase();
    const id = response.params.id;
    let success = false;
    const result = await foodSchema.deleteOne({ _id: id });
    if (result.deletedCount > 0) {
      success = true;
    }
    return NextResponse.json({ success, result });
  } catch (error) {
    console.error("Error in DELETE request:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
