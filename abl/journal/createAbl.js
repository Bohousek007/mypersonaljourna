//---------- Import Dependencies ----------//
const journalDao = require("../../dao/journal-dao.js"); // Import DAO for manipulating journal data
const { validateJournal } = require("../../helpers/validators.js"); // Import function for validating journal input data
//------------------------------------------//


//---------- Create a New Journal ----------//
async function CreateAbl(req, res) {
  try {
    // Retrieve the journal data from the request body
    const eventData = req.body;

    // Validate the input data
    if (!validateJournal(eventData)) {
      // If validation fails, respond with a 400 status and validation errors
      return res.status(400).json({
        code: "dtoInIsNotValid",
        message: "Input data is not valid",
        validationError: validateJournal.errors,
      });
    }

    // Create a new journal using DAO
    const createdJournal = await journalDao.create(eventData); // Call the `create` method in the DAO to save the journal data
    res.json(createdJournal); // Send the created journal entry as the response
  } catch (e) {
    // Handle errors by responding with a 500 status and error message
    res.status(500).json({ message: e.message });
  }
}
//------------------------------------------//


//---------- Export Function ----------//
module.exports = CreateAbl; // Export the function for use in the router
//-------------------------------------//
