//---------- Import Dependencies ----------//
const Ajv = require("ajv");                                           // Import the Ajv library for JSON schema validation
const ajv = new Ajv();                                                // Create a new instance of Ajv
const journalEntryDao = require("../../dao/journalEntry-dao.js");     // Import the Data Access Object (DAO) for manipulating journal entry data
//------------------------------------------//


//---------- Update Journal Entry ----------//
async function UpdateAbl(req, res) {
    try {
        // Get parameters from the request
        const reqParams = req.body;                                   // Retrieve parameters from the request body
        
        // Call the method to update the journal entry
        const result = await journalEntryDao.updateEntry(reqParams);  // Update the journal entry using DAO and store the result

        // Send a response with the update result
        res.json({ "msg": result });                                  // Send a JSON response with the operation result
    } catch (e) {
        // Handle the error and send a response with an error message
        res.status(500).json({ message: e.message });                 // In case of an error, send a response with an error message and status 500
    }
}
//------------------------------------------//


//---------- Export Function ----------//
module.exports = UpdateAbl;                                           // Export the function for use in the router
//-------------------------------------//
