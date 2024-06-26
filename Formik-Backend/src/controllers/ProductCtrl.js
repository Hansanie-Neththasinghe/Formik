const Product = require("../models/Product");


//@desc create Product
//@route POST /api/v1/product
//@access Public
exports.createProduct = async (req, res) => {
  try {
    const { productId, name, description, category, price } = req.body;

    //Check already exists
    const productExists = await Product.findOne({ productId });

    //if found
    if (productExists) {
      throw new Error("Product already exists");
    }

    //Create product
    const newProduct = await Product.create({
      productId,
      name,
      description,
      category,
      price,
    });

    res.status(201).json({
      status: "success",
      message: "New product created successfully",
      data: newProduct,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

//@desc Get all Products
//@route GET /api/v1/product
//@access Public
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(201).json({
      status: "success",
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

//@desc Get one Product by id
//@route GET /api/v1/product/:id
//@access Public
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.status(201).json({
      status: "success",
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

//@desc Update Product
//@route PUT /api/v1/product/:id
//@access Public
exports.updateProduct = async (req, res) => {
  try {
    const { productId, name, description, category, price } = req.body;

    //check already exists
    const productExist = await Product.findOne({ productId });
    if (productExist) {
      throw new Error("Product already exist");
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        productId,
        name,
        description,
        category,
        price,
      },
      {
        new: true,
      }
    );
    res.status(201).json({
      status: "success",
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

//@desc Delete Product
//@route DELETE /api/v1/product/:id
//@access Public
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(201).json({
      status: "success",
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
