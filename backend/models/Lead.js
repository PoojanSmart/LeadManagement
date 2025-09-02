const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
    name: {type: String, required: true},
    contact: {type: String, match: /\d{10}/, unique: true},
    email: {type: String, required: true, match: /[a-zA-Z0-9]@[a-zA-Z].[a-zA-Z]/, unique: true},
    altcontact: {type: String, match: /\d{10}/},
    altemail: {type: String, match: /[a-zA-Z0-9]@[a-zA-Z].[a-zA-Z]/},
    status: {type: String},
    qualification: {type: String},
    interest: {type: String},
    source: {type: String},
    assignedto: {type: String},
    updatedAt: {type: Date, default: Date.now},
    state: {type: String},
    city: {type: String},
    passoutyear: {type:Number, min: 1980, max: new Date().getFullYear()},
    heardfrom: {type: String}
})

module.exports = mongoose.model("Lead", leadSchema);