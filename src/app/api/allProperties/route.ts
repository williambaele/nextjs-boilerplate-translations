import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { connectToMongoDB } from "../../lib/mongo";

export async function GET(req: NextRequest) {
  console.log("Incoming URL:", req.nextUrl.href);
  console.log(
    "All Query Parameters:",
    JSON.stringify(Object.fromEntries(req.nextUrl.searchParams), null, 2),
  );

  try {
    await connectToMongoDB();
    const db = mongoose.connection.db;

    // Log the full URL and search parameters to debug
    console.log("URL:", req.nextUrl.href);
    console.log(
      "Search Parameters:",
      Array.from(req.nextUrl.searchParams.entries()),
    );

    const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "24", 10);

    interface Query {
      [key: string]: any;
    }

    let query: Query = {};
    const filters = ["location", "bedrooms"];

    // Handling status separately
    const status = req.nextUrl.searchParams.get("status");
    console.log("Status:", status);

    if (status === "rent") {
      query.category = 2;
    } else if (status === "sale") {
      query.category = 1;
    }

    // Handling propertyType separately
    const propertyType = req.nextUrl.searchParams.get("propertyType");
    if (propertyType) {
      switch (propertyType) {
        case "apartment":
          query["type"] = 1;
          break;
        case "house":
          query["type"] = 2;
          break;
        case "land":
          query["type"] = 3;
          break;
        case "office":
          query["type"] = 7;
          break;
        case "commercial":
          query["type"] = 4;
          break;
        case "parking":
          query["type"] = 5;
          break;
        default:
          break;
      }
    }

    filters.forEach((filter) => {
      const value = req.nextUrl.searchParams.get(filter);
      if (value && value.trim() !== "") {
        if (filter === "location") {
          query["region.name"] = value;
        } else if (filter === "bedrooms") {
          query[filter] = { $gte: parseInt(value, 10) };
        }
      }
    });

    const price = req.nextUrl.searchParams.get("price");
    if (price && price.trim() !== "") {
      const [min, max] = price.split("-").map(Number);
      query["price.value"] = { $gte: min, $lte: max || min };
    }

    console.log("Final Query:", query); // Log the final query to debug
    const collection = db.collection("Properties");

    // Ensure consistent pagination
    const skip = (page - 1) * limit;
    const cursor = collection.find(query).sort({ created_at: -1 }).skip(skip).limit(limit);
    const data = await cursor.toArray();

    console.log("Returned:", data.length);
    console.log(`Page: ${page}, Limit: ${limit}, Skip: ${skip}`);

    // Log each returned item's ID to help with debugging
    data.forEach((item, index) => {
      console.log(`Item ${index + 1}: ID = ${item._id}`);
    });

    return new NextResponse(JSON.stringify({ data }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return new NextResponse(JSON.stringify({ error: "Unable to fetch data" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
