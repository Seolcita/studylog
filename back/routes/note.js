const express = require("express");
const router = express.Router();

//middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

//controllers
const { create, allNotes, remove, countNotes } = require("../controllers/note");

router.post("/note", authCheck, adminCheck, create);
router.post("/notes", allNotes);
router.delete("/note/:slug", authCheck, adminCheck, remove);
router.get("/notes/total", countNotes);

module.exports = router;
