// src/adapters/routes/categoryRoutes.js

const express = require('express');
const CategoryController = require('../controllers/CategoryController');

function createCategoryRoutes({ categoryService }) {
    const categoryController = new CategoryController({ categoryService });
    const router = express.Router();

    router.post('/', categoryController.createCategory.bind(categoryController));
    router.get('/:categoryId', categoryController.getCategoryById.bind(categoryController));
    router.get('/', categoryController.getAllCategories.bind(categoryController));
    router.put('/:categoryId', categoryController.updateCategory.bind(categoryController));
    router.delete('/:categoryId', categoryController.deleteCategory.bind(categoryController));

    return router;
}

module.exports = createCategoryRoutes;
