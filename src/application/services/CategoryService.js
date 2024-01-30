// src/application/services/CategoryService.js

const CategoryRepositoryPort = require('../../ports/CategoryRepositoryPort');
const Category = require('../../domain/entities/Category');

class CategoryService {
    constructor({ categoryRepository }) {
        this.categoryRepository = categoryRepository;
    }

    async createCategory(categoryData) {
        return this.categoryRepository.create(categoryData);
    }

    async getCategoryById(categoryId) {
        return this.categoryRepository.getById(categoryId);
    }

    async getAllCategories() {
        return this.categoryRepository.getAll();
    }

    async updateCategory(categoryId, updatedCategoryData) {
        return this.categoryRepository.update(categoryId, updatedCategoryData);
    }

    async deleteCategory(categoryId) {
        return this.categoryRepository.delete(categoryId);
    }

    async categoryExists(categoryId) {
        const category = await this.categoryRepository.getById(categoryId);
        return !!category;
    }
}

module.exports = CategoryService;
