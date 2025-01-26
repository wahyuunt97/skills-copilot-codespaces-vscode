// Create web server
const express = require('express');
const app = express();

// create a comment object
const comment = {
    name: 'John Doe',
    comment: 'This is a test comment'
};

// create a route for the comment object
app.get('/comment', (req, res) => {
    res.json(comment);
});

// start the web server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});