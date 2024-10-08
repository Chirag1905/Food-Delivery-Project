import { connectionStr } from "@/app/lib/db";
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
    let result;
    let success = false;
    const userId = request.nextUrl.searchParams.get("id");
    result = await orderSchema.find({ user_id: userId });
    if (result) {
      let restoData = await Promise.all(
        result.map(async (item) => {
          let restoInfo = {};
          restoInfo.data = await restaurantSchema.findOne({
            _id: item.resto_id,
          });
          restoInfo.amount = item.amount;
          restoInfo.status = item.status;
          return restoInfo;
        })
      );
      result = restoData;
      success = true;
    }
    return NextResponse.json({ success, result });
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function POST(request, response) {
  try {
    await connectToDatabase();
    let payload = await request.json();
    let result;
    let success = false;
    const orderObj = new orderSchema(payload);
    result = await orderObj.save();
    if (result) {
      success = true;
    }
    return NextResponse.json({ result, success });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
