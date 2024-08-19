//---------- Import Dependencies ----------//
const journalDao = require("../../dao/journal-dao.js");       // Import DAO for manipulating journal data
const journalEntryDao = require("../../dao/journalEntry-dao.js"); // Import DAO for manipulating journal entry data
//------------------------------------------//


//---------- Get Diary and Its Entries ----------//
async function GetAbl(req, res) {
  try {
    // Retrieve the diary ID from the request parameters
    const id = req.params.id;

    // Fetch the diary by its ID
    const diary = await journalDao.getDiary(id);
    if (!diary || diary.msg) {
      // If the diary is not found, respond with a 404 status
      res.status(404).json({ message: "Diary not found" });
      return;
    }

    // Fetch all entries associated with the diary
    const entries = await journalEntryDao.getAllEntries(id);

    // Attach the entries to the diary object
    diary.children = entries || [];

    // Respond with the diary object including its entries
    res.json({...diary, children: entries});

  } catch (e) {
    // Handle any errors by responding with a 500 status and error message
    res.status(500).json({ message: e.message });
  }
}
//------------------------------------------//


//---------- Export Function ----------//
module.exports = GetAbl; // Export the function for use in the router
//-------------------------------------//
