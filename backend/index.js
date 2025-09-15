const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dronesRouter = require('./src/routes/drone.js');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ใช้ router
app.use('/drones', dronesRouter);

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
