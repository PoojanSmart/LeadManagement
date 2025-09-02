const express = require("express");
const router = express.Router();
const { getLeads, creatLead, searchLead } = require("../controllers/LeadController");

router.get("/leads", getLeads);
router.post("/lead", creatLead);
router.post("/leads/filter", searchLead);

module.exports = router;