//---------- CORS Configuration ----------//
const cors = require("cors");

module.exports = function(app) {                    // Export function to configure CORS for the application
  app.use(cors({                                    // Use the CORS middleware with specified options
    origin: true,                                   // Allow requests from any origin (you can specify a particular origin if needed)
    credentials: true                               // Allow cookies to be sent and received with CORS requests
  }));
};
//----------------------------------------//
