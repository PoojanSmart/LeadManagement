const Lead = require("../models/Lead");

/*
* Get all leads
*/
const getLeads = async (req, res) => {
    try {
        const leads = await Lead.find();
        res.json(leads);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

/*
* Get lead by ID 
*/
const getLeadsById = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);
        if (!lead) {
            return res.status(404).json({ message: "No Record Found" });
        }
        res.json(lead);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

/*
* Create a lead
*/
const creatLead = async (req, res) => {
    try {
        const {
            name, contact, email, altcontact,
            altemail, status, qualification,
            interest, source, assignedto,
            state, city, passoutyear,
            heardfrom
        } = req.body;
        const updatedAt = Date.now();
        const lead = new Lead({
            name, contact, email, altcontact, altemail,
            status, qualification, interest, source, assignedto,
            updatedAt, state, city, passoutyear, heardfrom
        });
        const saved = await lead.save();
        res.status(201).json(saved);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}

/*
* Update lead by Id
*/
const updateLeadById = async (req, res) => {
    try {
        const {
            name, contact, email, altcontact,
            altemail, status, qualification,
            interest, source, assignedto,
            state, city, passoutyear,
            heardfrom
        } = req.body;
        const updatedAt = Date.now();

        const lead = await Lead.findByIdAndUpdate(req.params.id, {
            name, contact, email, altcontact, altemail,
            status, qualification, interest, source, assignedto,
            updatedAt, state, city, passoutyear, heardfrom
        });

        if (!lead) {
            return res.status(404).json({ message: "Record not found" });
        }

        res.json(lead);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}

/*
* Search with filters
*/
const searchLead = async (req, res) => {
    try {
        let query = {};
        const filters = req.body.filters;
        // Using AND operation by default
        let operator = req.body.operator == undefined ? "and" : req.body.operator;
        if (operator === "and") {
            if (filters.name) query.name = filters.name;
            if (filters.contact) query.contact = filters.contact;
            if (filters.email) query.email = filters.email;
            if (filters.altcontact) query.altcontact = filters.altcontact;
            if (filters.altemail) query.altemail = filters.altemail;
            if (filters.qualification) query.qualification = filters.qualification;
            if (filters.interest) query.interest = filters.interest;
            if (filters.source) query.source = filters.source;
            if (filters.assignedto) query.assignedto = filters.assignedto;
            if (filters.state) query.state = filters.state;
            if (filters.city) query.city = filters.city;
            if (filters.passoutyear) query.passoutyear = filters.passoutyear;
            if (filters.heardfrom) query.heardfrom = filters.heardfrom;
        }
        else if (operator === "or") {
            let conditions = [];
            if (filters.name) conditions.push({ name: filters.name });
            if (filters.contact) conditions.push({ contact: filters.contact });
            if (filters.email) conditions.push({ email: filters.email });
            if (filters.altcontact) conditions.push({ altcontact: filters.altcontact });
            if (filters.altemail) conditions.push({ altemail: filters.altemail });
            if (filters.qualification) conditions.push({ qualification: filters.qualification });
            if (filters.interest) conditions.push({ interest: filters.interest });
            if (filters.source) conditions.push({ source: filters.source });
            if (filters.assignedto) conditions.push({ assignedto: filters.assignedto });
            if (filters.state) conditions.push({ state: filters.state });
            if (filters.city) conditions.push({ city: filters.city });
            if (filters.passoutyear) conditions.push({ passoutyear: filters.passoutyear });
            if (filters.heardfrom) conditions.push({ heardfrom: filters.heardfrom }); z
            if (conditions.length > 0) query = { $or: conditions };
        }
        else {
            res.status(500).json({ message: "Invalid operator: Allowed Operators (and, or)" });
        }

        const leads = await Lead.find(query);
        res.json(leads);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

/*
* Delete lead by ID
*/
const deleteLeadById = async (req, res) => {
    try {
        const lead = await Lead.findByIdAndDelete(req.params.id);
        if (!lead) {
            return res.status(404).json({ message: "No Record Found" });
        }
        res.json(lead);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { getLeads, creatLead, updateLeadById, searchLead, getLeadsById, deleteLeadById };