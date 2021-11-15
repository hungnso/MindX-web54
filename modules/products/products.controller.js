const ProductModel = require("./products");

const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.send({
      success: 1,
      data: products,
    });
  } catch (error) {
    res.status(400).send({
      success: 0,
      data: null,
      message: error.message || "Something went wrong",
    });
  }
};
const getProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const foundProduct = await ProductModel.findById(productId);
    res.send({
      success: 1,
      data: foundProduct,
    });
  } catch (error) {
    res.status(400).send({
      success: 0,
      data: null,
      message: error.message || "Something went wrong",
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const newProductdata = req.body;
    console.log(newProductdata);
    const newProduct = await ProductModel.create(newProductdata);

    res.send({
      success: 1,
      data: newProduct,
    });
  } catch (err) {
    res.status(400).send({
      success: 0,
      data: null,
      message: err.message || "Something went wrong",
    });
  }
};
const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const updateProductData = req.body;
    const updateProduct = await ProductModel.findOneAndUpdate(
      { _id: productId },
      updateProductData,
      { new: true }
    );

    res.send({
      success: 1,
      data: updateProduct,
    });
  } catch (err) {
    res.status(400).send({
      success: 0,
      data: null,
      message: err.message || "Something went wrong",
    });
  }
};

module.exports = { getAllProducts, createProduct, getProduct, updateProduct };
