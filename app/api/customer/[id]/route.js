import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodsModel";
import { restaurantSchema } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, response) {
  const id = response.params.id;
  await mongoose.connect(connectionStr);
  let details = await restaurantSchema.findOne({ _id: id });
  const foodItems = await foodSchema.find({ resto_id: id });
  return NextResponse.json({ details, foodItems, success: true });
}
