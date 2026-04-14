const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const scriptRoutes = require('./routes/scripts');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/scripts', scriptRoutes);

// serve frontend
app.use(express.static('client'));

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
