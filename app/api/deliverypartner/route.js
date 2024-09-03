import { connectionStr } from "@/app/lib/db";
import { deliveryPartnerSchema } from "@/app/lib/deliverypartnerModel";
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
    let result;
    let success = false;
    if (payload.login) {
      let result = await deliveryPartnerSchema.findOne({
        contact: payload.contact,
        password: payload.password,
      });
      if (result) {
        success = true;
      }
    } else {
      const deliveryPartner = new deliveryPartnerSchema(payload);
      result = await deliveryPartner.save();
      if (result) {
        success = true;
      }
    }
    return NextResponse.json({ success, result });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
