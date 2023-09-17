const express = require("express");
const router = express.Router();
const { superheroController } = require("../controllers/superheroController");

router.get("/", superheroController.getAll);
router.get("/:id", superheroController.getOne);
router.post("/", superheroController.addHero);
router.post("/:id/images", superheroController.addImages);
router.delete("/:id", superheroController.deleteHero);
router.put("/:id", superheroController.editHero);

module.exports = router;
