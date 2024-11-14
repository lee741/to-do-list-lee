const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve a simple message on the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));

});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
