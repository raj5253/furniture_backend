const Product = require("../models/Products");

const createProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    await newProduct.save();
    res.status(200).json("product  created successfully");
  } catch (error) {
    res.status(500).json("product  creation failed" + error);
  }
};
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json("failed to get all products");
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // static func
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json("failed to get the product");
  }
};

const searchProduct = async (req, res) => {
  try {
    const result = await Product.aggregate([
      //ig direct query there
      {
        $search: {
          index: "default",
          text: {
            query: req.params.key,
            path: {
              wildcard: "*", //search in anything, title, supplier..
            },
          },
        },
      },
    ]);
    res.status(200).json(result);
  } catch (error) {
    console.log("failed to search products" + error);
    res.status(500).json("error");
  }
};
module.exports = {
  createProduct: createProduct,
  getAllProducts: getAllProducts,
  getProduct: getProduct,
  searchProduct: searchProduct,
};
