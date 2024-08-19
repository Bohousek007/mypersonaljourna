//---------- Import Dependencies ----------//
const express = require('express');                         // Import Express framework for handling routes
const router = express.Router();                            // Create a new router instance for journal entry-related routes

const ListAbl = require('../abl/journalEntry/listAbl');     // Import the list action logic
const CreateAbl = require('../abl/journalEntry/createAbl'); // Import the create action logic
const DeleteAbl = require('../abl/journalEntry/deleteAbl'); // Import the delete action logic
const UpdateAbl = require('../abl/journalEntry/updateAbl'); // Import the update action logic
//------------------------------------------//


//---------- Define Routes ----------//

// Route to list all journal entries
router.get('/', ListAbl);                            // Handle GET requests to /journalEntry

// Route to create a new journal entry
router.post('/', CreateAbl);                         // Handle POST requests to /journalEntry

// Route to delete a journal entry by ID
router.delete('/:id', DeleteAbl);                    // Handle DELETE requests to /journalEntry/:id

// Route to update a journal entry by ID
router.put('/:id', UpdateAbl);                       // Handle PUT requests to /journalEntry/:id
//----------------------------------//


//---------- Export Router ----------//
module.exports = router;                             // Export the router for use in other parts of the application
//----------------------------------//
