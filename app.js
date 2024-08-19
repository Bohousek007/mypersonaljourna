//---------- Import Dependencies ----------//
const express = require('express');                                         // Import Express framework
const bodyParser = require('body-parser');                                  // Import body-parser middleware for parsing request bodies
const mongoose = require('mongoose');                                       // Import Mongoose for MongoDB object modeling
const corsSetup = require('./cors');                                        // Import custom CORS setup function
const config = require('./config');                                         // Import configuration settings
const userRouter = require('./controller/userController');                  // Import user routes
const journalRouter = require('./controller/journalController');            // Import journal routes
const journalEntryRouter = require('./controller/journalEntryController');  // Import journal entry routes
//----------------------------------------//


//---------- Create Express App ----------//
const app = express();                                // Create an instance of an Express application

// Middleware setup
app.use(bodyParser.json());                           // Parse incoming JSON requests
corsSetup(app);                                       // Apply CORS settings
//----------------------------------------//


//---------- Connect to MongoDB ----------//
mongoose.connect(config.mongoUri)                     // Connect to MongoDB using the URI from config
  .then(() => {
    console.log('Connected to MongoDB');              // Log success message on successful connection
  })
  .catch(err => {
    console.error('Connection error:', err);          // Log error message on connection failure
  });
//---------------------------------------//


//---------- Setup Routes ----------//
// Register routes with the Express application
app.use('/journals', journalRouter);                  // Route for journal-related operations
app.use('/journalEntry', journalEntryRouter);         // Route for journal entry-related operations
app.use('/users', userRouter);                        // Route for user-related operations
//------------------------------------//


//---------- Define Route Handlers ----------//
// Define specific route handlers
app.get('/', (req, res) => {                         // Root endpoint
  res.send('Hello World!');
});

app.get('/favicon.ico', (req, res) => {              // Handler for favicon requests to prevent 404 errors
  res.status(204).end();                             // Respond with no content
});
//--------------------------------------------//


//---------- Start Server ----------//
const PORT = config.port;                            // Retrieve port number from config
app.listen(PORT, () => {                             // Start the server and listen on the specified port
  console.log(`Server is running on port ${PORT}`);  // Log success message
});
//----------------------------------//
