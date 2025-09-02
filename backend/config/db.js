const mongoose = require("mongoose");

const dbConnection = async () => {
    try {
        const conn = mongoose.connect(process.env.MONGODB_URL);
        console.log("DB connected");
    }
    catch (error) {
        console.error("Error occurred while connecting to DB");
        process.exit(1);
    }
}


module.exports = dbConnection;