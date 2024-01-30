// src/adapters/routes/productRoutes.js

const express = require('express');
const ProductController = require('../controllers/ProductController');

function createProductRoutes({ productService, categoryService }) {
    const productController = new ProductController({ productService, categoryService });
    const router = express.Router();

    router.post('/', productController.createProduct.bind(productController));
    router.get('/:productId', productController.getProductById.bind(productController));
    router.get('/:categoryId/category', productController.getProductByCategory.bind(productController));
    router.get('/', productController.getAllProducts.bind(productController));
    router.put('/:productId', productController.updateProduct.bind(productController));
    router.delete('/:productId', productController.deleteProduct.bind(productController));

    return router;
}

module.exports = createProductRoutes;
