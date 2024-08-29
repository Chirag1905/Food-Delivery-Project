import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, response) {
  await mongoose.connect(connectionStr);
  let result = await restaurantSchema.find();

result =result.map((item)=>item.city.charAt(0).toUpperCase()+item.city.slice(1));
result = [...new Set(result.map((item)=>item))]
  return NextResponse.json({result, success: true });
}
