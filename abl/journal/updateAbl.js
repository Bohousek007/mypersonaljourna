//---------- Import Dependencies ----------//
const Ajv = require("ajv"); // Import Ajv library for JSON schema validation
const ajv = new Ajv(); // Create a new instance of Ajv

const journalDao = require("../../dao/journal-dao.js"); // Import DAO for manipulating journal data
//------------------------------------------//


//---------- Define Validation Schema ----------//
const schema = {
    type: "object",
    properties: {
        id: { type: "string", minLength: 5 }, // Validate ID, adjusted for MongoDB ObjectId length
        newName: { type: "string", minLength: 3 }, // Validate the new name of the journal
    },
    required: ["id", "newName"], // `id` and `newName` are required fields
    additionalProperties: false, // Disallow any additional properties not defined in the schema
};
//---------------------------------------------//


//---------- Update Journal ----------//
async function UpdateAbl(req, res) {
    try {
        // Get request parameters from the request body
        const reqParams = req.body;

        // Validate input data against the schema
        const valid = ajv.validate(schema, reqParams);
        if (!valid) {
            // If data is not valid, return an error with validation details
            res.status(400).json({
                code: "dtoInIsNotValid",
                message: "dtoIn is not valid",
                validationError: ajv.errors,
            });
            return;
        }

        // Call the method to update the journal asynchronously
        const result = await journalDao.updateDiary(reqParams);

        // Handle the case where the journal was not found or updated
        if (!result || result.msg) {
            res.status(404).json({ message: "Diary not found or not updated" });
            return;
        }

        // Send a response with a success message
        res.json({ "msg": "Diary updated successfully" });

    } catch (e) {
        // Log the error for debugging purposes
        console.error("Error in UpdateAbl:", e);
        res.status(500).json({ message: e.message });
    }
}
//---------------------------------------------//


//---------- Export Function ----------//
module.exports = UpdateAbl; // Export the function for use in the router
//-------------------------------------//
