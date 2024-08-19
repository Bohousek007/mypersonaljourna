//---------- Import Dependencies ----------//
const journalEntryDao = require("../../dao/journalEntry-dao.js");  // Import Data Access Object (DAO) for manipulating journal entries
//------------------------------------------//


//---------- List Journal Entries ----------//
async function ListAbl(req, res) {
  try {
    // Retrieve the list of journal entries
    const journalList = await journalEntryDao.list();  // Call the `list` method in DAO to get all journal entries

    // Send a response with the list of journal entries
    res.json(journalList);  // Send the list of entries as JSON
  } catch (e) {
    // Handle the error and send a response with an error message
    res.status(500).json({ message: e.message });  // In case of an error, send a response with an error message and status 500
  }
}
//------------------------------------------//


//---------- Export Function ----------//
module.exports = ListAbl;  // Export the function for use in the router
//-------------------------------------//
