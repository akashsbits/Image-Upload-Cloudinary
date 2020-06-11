const status = require("statuses");
const Product = require("../models/Product");
// const { CustomAPIError, NotFoundError, BadRequestError } = require("../errors");

const createProduct = async (req, res) => {
  const product = await Product.create(req.body);

  res.status(status("OK")).json({ product });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({});

  res.status(status("OK")).json({ products });
};

module.exports = { createProduct, getAllProducts };
