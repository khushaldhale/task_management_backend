const express = require("express");
const { authentication, isUser } = require("../middlewares/authentication");
const { createTeam, addTeamMember, removeTeamMember } = require("../controllers/team");
const router = express.Router();

router.post("/create-team", authentication, isUser, createTeam);
router.put("/:id/add-member", authentication, isUser, addTeamMember);
router.put("/:id/remove-member", authentication, isUser, removeTeamMember);



module.exports = router;