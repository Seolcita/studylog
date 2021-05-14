const mongoose = require("mongoose");

//Subject Category
const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Subject Name is required",
      minlength: [3, "Too short"],
      maxlength: [10000, "Too long"],
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subject", subjectSchema);
