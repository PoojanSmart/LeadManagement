const Lead = require("../models/Lead");

/*
* Get all leads
*/
const getLeads = async (req, res) => {
    try {
        const leads = await Lead.find();
        res.json(leads);
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
}

/*
* Create a lead
*/
const creatLead = async (req, res) => {
    try {
        const  {
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
    catch(err) {
        res.status(400).json({message: err.message});
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

        }
        else {
            res.status(500).json({message: "Invalid operator: Allowed Operators (and, or)"});
        }

        const leads = await Lead.find(query);
        res.json(leads);
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }
} 

module.exports = {getLeads, creatLead, searchLead};