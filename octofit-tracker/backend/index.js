const express = require('express');
const app = express();
const PORT = 8000;

app.get('/', (req, res) => {
  res.send('Backend is running on port 8000');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});