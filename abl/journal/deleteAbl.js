//---------- Import Dependencies ----------//
const { validateDelete } = require("../../helpers/validators.js"); // Import function for validating deletion input data
const journalDao = require("../../dao/journal-dao.js");            // Import DAO for manipulating journal data
const journalEntryDao = require("../../dao/journalEntry-dao.js"); // Import DAO for manipulating journal entry data
//------------------------------------------//


//---------- Delete Diary and Its Entries ----------//
async function DeleteAbl(req, res) {
  try {
    // Retrieve the diary ID from the request parameters
    const id = req.params.id;

    // Validate the input data
    const isValid = validateDelete({ id });
    if (!isValid) {
      // If the input data is invalid, respond with a 400 status and validation errors
      return res.status(400).json({
        code: "dtoInIsNotValid",
        message: "Input data is not valid",
        validationError: validateDelete.errors,
      });
    }

    // Delete the diary and its associated entries
    const result1 = await journalDao.deleteDiary(id);             // Delete the diary by ID
    const result2 = await journalEntryDao.deleteAllEntries(id);  // Delete all entries associated with the diary

    // Check the success of the deletions
    if (result1?.deletedCount > 0 || result2?.deletedCount > 0) {
      // If any deletions were successful, respond with a success message
      res.json({ msg: "Journal and entries deleted successfully" });
    } else {
      // If no deletions were successful, respond with a 404 status
      res.status(404).json({ msg: "Journal or entries not found" });
    }
  } catch (e) {
    // Handle any errors by responding with a 500 status and error message
    res.status(500).json({ message: e.message });
  }
}
//------------------------------------------//


//---------- Export Function ----------//
module.exports = DeleteAbl; // Export the function for use in the router
//-------------------------------------//
