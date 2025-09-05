const express = require("express");
const dbConnection = require("./config/db.js");
require("dotenv").config();

dbConnection();

const app = express();
app.use(express.json());

const leadRoutes = require("./routes/LeadRoutes.js");
app.use("/api/leadmgnt", leadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server is running");
})

