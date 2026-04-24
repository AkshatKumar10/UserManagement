import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  image: String,
  imageUrl: String,
});

export default mongoose.model("Image", ImageSchema);
