const Product = require('../models/product');
const jsonData = require('./products.json');

const loadInitialData = async () => {
  await Product.deleteMany();
  await Product.create(jsonData);
  console.log('Inital data loaded!');
  console.log(`Total items: ${jsonData.length}`);
};

module.exports = loadInitialData;
