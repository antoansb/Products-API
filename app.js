require('dotenv').config();

const express = require('express');
const app = express();

const connectDB = require('./db/connectDB');

const errorHandler = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');

app.get('/', (req, res) => {
  res.send('Products API');
});

app.use(errorHandler);
app.use(notFound);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(3000, console.log('Server is listening on port 3000...'));
  } catch (error) {
    console.log(error);
  }
};

start();
