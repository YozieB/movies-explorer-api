require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const errorHandler = require('./middlewares/error');
const router = require('./routes');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT_CFG, DB_CFG } = require('./utils/config');

const app = express();
app.use(express.json());
app.use(requestLogger);
app.use(cors);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
mongoose
  .connect(DB_CFG)
  .then(() => console.log('DB OK'))
  .catch((error) => console.log(`DB Error: ${error}`));

app.listen(PORT_CFG, (error) => {
  if (error) {
    console.log(`Server Error: ${error}`);
  } else {
    console.log('Server OK');
  }
});
