require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./routes/index');

app.use(express.json());

app.use('/', routes);  

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
