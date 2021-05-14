const Note = require("../models/note");
const User = require("../models/user");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title);
    const newNote = await new Note(req.body).save();
    res.json(newNote);
  } catch (error) {
    console.log(error);
    res.json("fail to create note");
  }
};

exports.allNotes = async (req, res) => {
  try {
    const { sort, order, page } = req.body;
    const currentPage = page || 1;
    const perPage = 10;

    const notes = await Note.find({})
      .skip((currentPage - 1) * perPage)
      .populate("subject")
      .sort([[sort, order]])
      .limit(perPage)
      .exec();

    res.json(notes);
  } catch (error) {
    console.log(err);
  }
};

exports.remove = async (req, res) => {
  try {
    console.log("slug from front?", req.params.slug);

    const slug = req.params.slug;
    const deletedNote = await Note.findOneAndDelete({ slug: slug });

    res.json(deletedNote);
  } catch (error) {
    console.log("delete note error", error);
  }
};

exports.countNotes = async (req, res) => {
  try {
    let total = await Note.find({}).estimatedDocumentCount().exec();
    res.json(total);
  } catch (error) {
    console.log(error);
  }
};
