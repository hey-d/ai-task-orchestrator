const mongoose = require("mongoose");



const taskSchema = new mongoose.Schema({
  userId: { type: String, required: true},
  title: { type: String, required: true },
  priority: { type: String, required: true},
  category: { type: String, required: true },
  estimatedTime: { type: String, required: true },
  rawInput: { type: String }, // Good for debugging
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Task", taskSchema);
