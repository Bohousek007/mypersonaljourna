//---------- Import Dependencies ----------//
const journalEntryDao = require("../../dao/journalEntry-dao.js"); // Import DAO for manipulating journal entries
const { validateJournalEntry } = require("../../helpers/validators.js"); // Import function for validating journal entry data
//------------------------------------------//


//---------- Create Journal Entry ----------//
async function CreateAbl(req, res) {
  try {
    const entry = req.body; // Retrieve the journal entry data from the request body

    // Validate the input data
    if (!validateJournalEntry(entry)) {
      return res.status(400).json({
        code: "dtoInIsNotValid",
        message: "Input data is not valid",
        validationError: validateJournalEntry.errors, // Provide validation errors in the response
      });
    }

    // Create the journal entry
    const createdEntry = await journalEntryDao.create(entry); // Call the `create` method in the DAO to save the entry
    res.json(createdEntry); // Send the created entry as the response
  } catch (e) {
    // Handle the error and send a response with an error message
    res.status(500).json({ message: e.message });
  }
}
//------------------------------------------//


//---------- Export Function ----------//
module.exports = CreateAbl; // Export the function for use in the router
//-------------------------------------//
