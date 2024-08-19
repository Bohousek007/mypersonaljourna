//---------- Import Dependencies ----------//
const mongoose = require('mongoose');         // Import Mongoose for MongoDB object modeling
const { v4: uuidv4 } = require('uuid');       // Import uuid for generating unique IDs
const Schema = mongoose.Schema;               // Import Schema constructor from Mongoose
//----------------------------------------//


//---------- Define Journal Schema ----------//
// Schema definition for journals
const journalSchema = new Schema({
  id: { type: String, required: true, unique: true },     // Unique identifier for the journal (required)
  name: { type: String, required: true }                  // Name of the journal (required)
});
//---------------------------------------//


//---------- Create Journal Model ----------//
const Journal = mongoose.model('Journal', journalSchema); // Create a Mongoose model for the Journal schema
//-------------------------------------//


//---------- Data Access Methods ----------//

// Method to create a new journal
async function create(event) {
  if (!event.name || typeof event.name !== 'string' || event.name.length < 3) {
    throw new Error('Invalid journal name');                        // Validate journal name
  }
  event.id = uuidv4();                                              // Generate a unique ID for the new journal
  try {
    return await Journal.create(event);                             // Create and save the journal in the database
  } catch (error) {
    throw new Error(`Error creating journal: ${error.message}`);    // Handle errors
  }
}

// Method to list all journals
async function list() {
  try {
    return await Journal.find();                                    // Retrieve all journals from the database
  } catch (error) {
    throw new Error(`Error listing journals: ${error.message}`);    // Handle errors
  }
}

// Method to get a journal by its ID
async function getDiary(diaryId) {
  try {
    return await Journal.findOne({ id: diaryId });                  // Find a journal by its unique ID
  } catch (error) {
    throw new Error(`Error retrieving journal: ${error.message}`);  // Handle errors
  }
}

// Method to delete a journal by its ID
async function deleteDiary(diaryId) {
  try {
    return await Journal.deleteOne({ id: diaryId });             // Delete a journal with the specified ID
  } catch (error) {
    throw new Error(`Error deleting journal: ${error.message}`); // Handle errors
  }
}

// Method to update the name of a journal
async function updateDiary(diary) {
  const { id, newName } = diary; // Extract ID and new name from the diary object
  if (!newName || typeof newName !== 'string' || newName.length < 3) {
    throw new Error('Invalid new journal name'); // Validate new name
  }
  try {
    return await Journal.findOneAndUpdate(
      { id: id },               // Find journal by ID
      { name: newName },        // Update the journal's name
      { new: true }             // Return the updated journal
    );
  } catch (error) {
    throw new Error(`Error updating journal: ${error.message}`); // Handle errors
  }
}
//--------------------------------------//


//---------- Export Data Access Methods ----------//
module.exports = {
  create,        // Export the create method for adding new journals
  list,          // Export the list method for retrieving all journals
  getDiary,      // Export the getDiary method for finding a journal by ID
  deleteDiary,   // Export the deleteDiary method for removing a journal by ID
  updateDiary    // Export the updateDiary method for updating a journal's name
};
//-------------------------------------------//
