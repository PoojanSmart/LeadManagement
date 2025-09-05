const express = require("express");
const router = express.Router();
const { getLeads, creatLead, updateLeadById, searchLead, getLeadsById, deleteLeadById } = require("../controllers/LeadController");

router.get("/leads", getLeads);
router.get("/leads/:id", getLeadsById);
router.post("/lead", creatLead);
router.patch("/lead/:id", updateLeadById);
router.post("/leads/filter", searchLead);
router.delete("/leads/:id", deleteLeadById);
module.exports = router;