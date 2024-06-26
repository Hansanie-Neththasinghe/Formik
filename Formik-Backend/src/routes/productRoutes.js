const express = require("express");

const{
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require("../controllers/ProductCtrl");

const productRouter = express.Router();

productRouter.route("/").post(createProduct)
            .get(getProducts);

productRouter.route("/:id").get(getProductById)
            .put(updateProduct)
            .delete(deleteProduct);

module.exports = productRouter;