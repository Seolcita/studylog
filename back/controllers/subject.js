const Subject = require("../models/subject");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const subjectName = await new Subject({ name, slug: slugify(name) }).save();
    // console.log("subjectName----->", subjectName);
    res.json(subjectName);
  } catch (error) {
    res.status(400).send("Create category failed");
  }
};

exports.list = async (req, res) => {
  try {
    const subjectList = await Subject.find({}).sort({ createdAt: -1 }).exec();
    // console.log("all subject =====>", subjectList);
    res.json(subjectList);
  } catch (error) {
    res.json(error);
  }
};

exports.remove = async (req, res) => {
  try {
    const { slug } = req.params;
    const deleted = await Subject.findOneAndDelete({ slug });
    res.json(deleted);
  } catch (error) {
    res.json(error);
  }
};

exports.getSubject = async (req, res) => {
  try {
    const { slug } = req.params;
    const subject = await Subject.findOne({ slug }).exec();
    // console.log("result-one-subject", subject);
    res.json(subject.name);
  } catch (error) {
    res.json(error);
  }
};

exports.update = async (req, res) => {
  // console.log("subject name?", req.body);
  try {
    const { subject } = req.body;
    const updated = await Subject.findOneAndUpdate(
      { slug: req.params.slug },
      { name: subject, slug: slugify(subject) },
      { new: true }
    ).exec();
    console.log("updated from db---->", updated);
    res.json(updated);
  } catch (error) {
    res.json(error);
  }
};
