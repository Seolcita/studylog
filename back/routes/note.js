const express = require("express");
const router = express.Router();

//middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

//controllers
const {
  create,
  allNotes,
  remove,
  countNotes,
  getOneNote,
  update,
} = require("../controllers/note");

router.post("/note", authCheck, adminCheck, create);
router.post("/notes", allNotes);
router.delete("/note/:slug", authCheck, adminCheck, remove);
router.get("/notes/total", countNotes);
router.get("/note/:slug", getOneNote);
router.put("/note/:slug", authCheck, adminCheck, update);

module.exports = router;
