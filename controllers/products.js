const Product = require('../models/product');

const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({ products });
};

const getSingleProduct = async (req, res, next) => {
  const { id: productID } = req.params;
  const product = await Product.findOne({ _id: productID });
  if (!product) {
    return next(`Product with id: ${productID} does not exist`);
  }

  res.status(200).json({ product });
};

const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ product });
};

const updateProduct = async (req, res, next) => {
  const { id: productID } = req.params;

  const product = await Product.findOneAndUpdate({ _id: productID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(`Product with id: ${productID} does not exist`);
  }

  res.status(200).json({ product });
};

const deleteProduct = async (req, res, next) => {
  const { id: productID } = req.params;
  const product = await Product.findOneAndDelete({ _id: productID });
  if (!product) {
    return next(`Product with id: ${productID} does not exist`);
  }

  res.status(200).json({ product });
};

module.exports = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};