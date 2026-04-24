import mongoose from "mongoose";
import Users from "./src/models/user.model.js";
import config from "./src/config/config.js";

const deleteSeed = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    console.log("MongoDB successfully connected...");

    await Users.deleteMany({});
    console.log("All users deleted");

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.connection.close();
    console.log("Connection closed");
  }
};

deleteSeed();