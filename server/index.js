/* eslint-disable no-console */
import mongoose from "mongoose";
import config from "./src/config/config.js";
import app from "./src/app.js";

mongoose.connect(config.mongoUri)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(config.port, () => {
      console.log(`Server started at port ${config.port}`);
    });
  })
  .catch((err) => console.log(err));
