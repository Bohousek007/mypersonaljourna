//---------- Import Dependencies ----------//
const mongoose = require('mongoose');        // Import Mongoose for MongoDB object modeling
const { v4: uuidv4 } = require('uuid');      // Import uuid for generating unique IDs
const Schema = mongoose.Schema;              // Import Schema constructor from Mongoose
//----------------------------------------//


//---------- Define Journal Entry Schema ----------//
// Schema definition for journal entries
const journalEntrySchema = new Schema({
  id: { type: String, required: true },      // Unique identifier for the journal entry (required)
  title: { type: String, required: true },   // Title of the journal entry (required)
  diaryId: { type: String, required: true }  // Identifier of the diary to which the entry belongs (required)
});
//--------------------------------------------//


//---------- Create Journal Entry Model ----------//
const JournalEntry = mongoose.model('JournalEntry', journalEntrySchema); // Create a Mongoose model for the JournalEntry schema
//---------------------------------------------//


//---------- Data Access Methods ----------//

// Method to create a new journal entry
function create(entry) {
  entry.id = uuidv4();                                      // Generate a unique ID for the new journal entry
  return JournalEntry.create(entry);                        // Create and save the journal entry in the database
}

// Method to list all journal entries
function list() {
  return JournalEntry.find();                               // Retrieve all journal entries from the database
}

// Method to delete a journal entry by its ID
function deleteEntry(entryId) {
  return JournalEntry.deleteOne({ id: entryId });           // Delete a journal entry with the specified ID
}

// Method to delete all journal entries that belong to a specific diary
function deleteAllEntries(diaryId) {
  return JournalEntry.deleteMany({ diaryId: diaryId });     // Delete all journal entries associated with the specified diary ID
}

// Method to get all journal entries that belong to a specific diary
async function getAllEntries(diaryId) {
  const entries = await JournalEntry.find({ diaryId: diaryId }).exec();   // Find all journal entries by diary ID
  return entries;                                                         // Return the retrieved entries
}

// Method to update a journal entry (change title)
function updateEntry(entry) {
  const { id, newName, diaryId } = entry;       // Extract ID, new title, and diary ID from the entry object
  return JournalEntry.findOneAndUpdate(
    { id: id },                                 // Find the journal entry by ID
    { title: newName, diaryId: diaryId },       // Update the title and diary ID
    { new: true }                               // Return the updated document
  );
}
//--------------------------------------//


//---------- Export Data Access Methods ----------//
module.exports = {
  create,            // Export the create method for adding new journal entries
  list,              // Export the list method for retrieving all journal entries
  deleteEntry,       // Export the deleteEntry method for removing a journal entry by ID
  updateEntry,       // Export the updateEntry method for updating a journal entry's title
  deleteAllEntries,  // Export the deleteAllEntries method for removing all entries associated with a diary
  getAllEntries      // Export the getAllEntries method for retrieving all entries associated with a diary
};
//------------------------------------------------//
