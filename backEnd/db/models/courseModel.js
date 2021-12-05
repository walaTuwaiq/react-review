const mongoose = require("mongoose");

const courseModel = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  chapters: { type: Number, required: true },
  subject: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
});

module.exports = mongoose.model("courseModel", courseModel);
