const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 50,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    note: {
      type: String,
      required: true,
      maxlength: 10000,
      text: true,
    },
    subject: {
      type: ObjectId,
      ref: "Subject",
    },
    images: {
      type: Array,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Note", noteSchema);
