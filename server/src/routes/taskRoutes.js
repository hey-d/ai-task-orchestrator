const express = require("express");
const router = express.Router();
const  taskContorllers  = require("../contorllers/taskControllers");

router.post("/analyze", taskContorllers.analyzeTask);
router.get("/", taskContorllers.getTasks);
module.exports = router;
