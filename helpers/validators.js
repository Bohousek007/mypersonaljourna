//---------- Import Dependencies ----------//
const Ajv = require("ajv");                           // Import Ajv for JSON Schema validation
const addFormats = require("ajv-formats").default;    // Import Ajv formats extension for additional schema formats
//----------------------------------------//


//---------- Initialize Ajv Instance ----------//
const ajv = new Ajv();                                // Create a new instance of Ajv for JSON Schema validation
addFormats(ajv);                                      // Add additional formats to the Ajv instance
//---------------------------------------------//


//---------- Define Schemas ----------//

// Schema for journals
const journalSchema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 3 },           // Journal name must be a string with at least 3 characters
  },
  required: ["name"],                                 // Journal name is required
  additionalProperties: false,                        // No additional properties allowed
};

// Schema for journal entries
const journalEntrySchema = {
  type: "object",
  properties: {
    title: { type: "string", minLength: 3 },          // Entry title must be a string with at least 3 characters
    diaryId: { type: "string", minLength: 5 },        // Diary ID must be a string with at least 5 characters
  },
  required: ["title", "diaryId"],                     // Both title and diaryId are required
  additionalProperties: false,                        // No additional properties allowed
};

// Schema for delete operations
const deleteSchema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 5 },             // ID must be a string with at least 5 characters
  },
  required: ["id"],                                   // ID is required
  additionalProperties: false,                        // No additional properties allowed
};
//----------------------------------------//


//---------- Compile Validators ----------//

// Validator for delete operations
const validateDelete = ajv.compile(deleteSchema);             // Compile the delete schema into a validator function

// Validator for journals
const validateJournal = ajv.compile(journalSchema);           // Compile the journal schema into a validator function

// Validator for journal entries
const validateJournalEntry = ajv.compile(journalEntrySchema); // Compile the journal entry schema into a validator function
//--------------------------------------//


//---------- Export Validators ----------//
module.exports = {
  validateJournal,           // Export the validator for journal schema
  validateJournalEntry,      // Export the validator for journal entry schema
  validateDelete             // Export the validator for delete operations schema
};
//--------------------------------------//
