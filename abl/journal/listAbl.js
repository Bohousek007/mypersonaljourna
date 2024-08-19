//---------- Import Dependencies ----------//
const journalDao = require("../../dao/journal-dao.js"); // Import DAO for manipulating journal data
//------------------------------------------//


//---------- List Journals ----------//
async function ListAbl(req, res) {
  try {
    // Retrieve the list of journals asynchronously
    const journalList = await journalDao.list();

    // Send the list of journals as JSON response
    res.json(journalList);
  } catch (e) {
    // Handle errors by sending a JSON response with error details
    res.status(500).json({ message: e.message });
  }
}
//------------------------------------------//


//---------- Export Function ----------//
module.exports = ListAbl; // Export the function for use in the router
//-------------------------------------//
