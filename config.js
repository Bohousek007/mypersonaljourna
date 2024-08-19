//---------- Configuration Settings ----------//
const config = {
  serverUrl: "http://localhost:8000",                        // Base URL for the server
  port: 8000,                                                // Port on which the server will listen
  mongoUri: 'mongodb://localhost:27017/mypersonaljournaldb', // MongoDB URI for connecting to the database
  sessionSecret: 'a/#$sd#0$'                                 // Secret key used for session management (e.g., signing cookies)
};

module.exports = config;                                     // Export the configuration object for use in other parts of the application
//---------------------------------------------//
