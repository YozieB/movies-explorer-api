const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./middlewares/error');

const app = express();
app.use(express.json());
app.use(errorHandler);
mongoose
  .connect('mongodb://localhost:27017/bitfilmsdb')
  .then(() => console.log('DB OK'))
  .catch((error) => console.log(`DB Error: ${error}`));

app.listen(3000, (error) => {
  if (error) {
    console.log(`Server Error: ${error}`);
  } else {
    console.log('Server OK');
  }
});
