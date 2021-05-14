const express = require("express");
const router = express.Router();

//middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

//controller
const {
  create,
  list,
  remove,
  getSubject,
  update,
} = require("../controllers/subject");

//routes
router.post("/create/subject", authCheck, adminCheck, create);
router.get("/subjects", list);
router.delete("/subject/:slug", authCheck, adminCheck, remove);
router.get("/subject/:slug", getSubject);
router.put("/subject/:slug", authCheck, adminCheck, update);

module.exports = router;
