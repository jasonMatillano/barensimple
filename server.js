const express = require('express');
const app = express();

// Serve static files from the this "./" directory
app.use(express.static('./'));

// Create a simple request logger middleware
const morgan = require('morgan'); // Import the morgan package
const customFormat = 'From frontend_barensimple.server';
app.use(morgan(customFormat));

// Define Desired Port Number
const port = 5000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
