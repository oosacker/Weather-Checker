const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/get_data', (req, res) => {
  res.send({ 
    data: 'This is your data!!' 
  });
});