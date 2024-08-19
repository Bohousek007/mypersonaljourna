//---------- Import Dependencies ----------//
const { validateDelete } = require("../../helpers/validators.js"); // Import function for validating input data
const journalEntryDao = require("../../dao/journalEntry-dao.js");  // Import DAO for manipulating journal entries
//------------------------------------------//


//---------- Delete Journal Entry ----------//
async function DeleteAbl(req, res) {
  try {
    // Retrieve the ID from the URL parameter
    const id = req.params.id;

    // Validate the input data
    const isValid = validateDelete({ id }); // Validate the ID using the defined schema
    if (!isValid) {
      // If the data is not valid, return an error with validation details
      return res.status(400).json({
        code: "dtoInIsNotValid",
        message: "Input data is not valid",
        validationError: validateDelete.errors,
      });
    }

    // Asynchronously delete the journal entry
    const result = await journalEntryDao.deleteEntry(id); // Call the `deleteEntry` method in the DAO

    if (result?.deletedCount > 0) {
      // If something was deleted, return a success message
      res.json({ msg: "Journal entry deleted successfully" });
    } else {
      // If the entry does not exist, return a 404 error
      res.status(404).json({ msg: "Journal entry not found" });
    }
  } catch (e) {
    // Handle the error and send a response with an error message
    res.status(500).json({ message: e.message });
  }
}
//------------------------------------------//


//---------- Export Function ----------//
module.exports = DeleteAbl; // Export the function for use in the router
//-------------------------------------//
