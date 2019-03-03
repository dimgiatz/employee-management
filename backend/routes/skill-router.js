const express = require("express");
const router = express.Router();

const SkillController = require("../controllers/skill-controller");

router.post("/upsert", SkillController.skillUpsert);
router.post("/upserts", SkillController.skillsUpsert);
router.post("/search", SkillController.skillSearch);
router.post("/delete", SkillController.skillDelete);
router.post("/get", SkillController.getSkillById);
router.post("/update", SkillController.updateSkill);

module.exports = router;