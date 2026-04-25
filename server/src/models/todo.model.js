import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: "Task description is required",
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: String,
    default: "Office",
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Todo", TodoSchema);
