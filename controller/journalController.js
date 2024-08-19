//---------- Import Dependencies ----------//
const express = require('express');                    // Import the Express framework for routing
const router = express.Router();                       // Create a new router instance for handling journal-related routes

const ListAbl = require('../abl/journal/listAbl');     // Import application logic for listing journals
const CreateAbl = require('../abl/journal/createAbl'); // Import application logic for creating a new journal
const GetAbl = require('../abl/journal/getAbl');       // Import application logic for retrieving a specific journal by ID
const UpdateAbl = require('../abl/journal/updateAbl'); // Import application logic for updating a journal by ID
const DeleteAbl = require('../abl/journal/deleteAbl'); // Import application logic for deleting a journal by ID
//------------------------------------------//


//---------- Define Routes ----------//

// Route for listing all journals
router.get('/', ListAbl);                              // Handle GET requests to /journals

// Route for retrieving a specific journal by ID
router.get('/:id', GetAbl);                            // Handle GET requests to /journals/:id

// Route for creating a new journal
router.post('/', CreateAbl);                           // Handle POST requests to /journals

// Route for updating a specific journal by ID
router.put('/:id', UpdateAbl);                         // Handle PUT requests to /journals/:id

// Route for deleting a specific journal by ID
router.delete('/:id', DeleteAbl);                      // Handle DELETE requests to /journals/:id
//----------------------------------//


//---------- Export Router ----------//
module.exports = router;                               // Export the router for use in other parts of the application
//----------------------------------//
