import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MongoDB URI is not set. Please check your .env.local file.");
}

const options = {
  socketTimeoutMS: 7200000,
};

// Connection Events
mongoose.connection.on("connected", () => {
  console.log("Mongoose has successfully connected to MongoDB.");
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose has disconnected.");
});

// Establishing the connection
export const connectToMongoDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("Already connected to MongoDB.");
      return;
    }

    await mongoose.connect(uri, options);
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
