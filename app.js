require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const connectDB = require('./db/connectDB');
const productsRouter = require('./routes/products');

const errorHandler = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');

const loadInitialData = require('./data/loadInitialData');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Products API');
});

app.use('/api/v1/products', productsRouter);

app.use(errorHandler);
app.use(notFound);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    loadInitialData();
    app.listen(3000, console.log('Server is listening on port 3000...'));
  } catch (error) {
    console.log(error);
  }
};

start();
