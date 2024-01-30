// src/infrastructure/repositories/MongoCategoryRepository.js

const mongoose = require('mongoose');
const Category = require('../../domain/entities/Category');
const CategoryRepositoryPort = require('../../ports/CategoryRepositoryPort');

const categorySchema = new mongoose.Schema({
    name: String,
    description: String,
});
mongoose.set('strictQuery', true);
const CategoryModel = mongoose.model('Category', categorySchema);

class MongoCategoryRepository extends CategoryRepositoryPort {
    async create(category) {
        const createdCategory = await CategoryModel.create(category);
        return new Category(createdCategory.toObject());
    }

    async getById(categoryId) {
        const categoryData = await CategoryModel.findById(categoryId).lean();
        return categoryData ? new Category(categoryData) : null;
    }

    async getAll() {
        const categoriesData = await CategoryModel.find().lean();
        return categoriesData.map(categoryData => new Category(categoryData));
    }

    async update(categoryId, updatedCategory) {
        const result = await CategoryModel.findByIdAndUpdate(categoryId, updatedCategory, { new: true }).lean();
        return result ? new Category(result) : null;
    }

    async delete(categoryId) {
        const result = await CategoryModel.findByIdAndRemove(categoryId).lean();
        return result ? new Category(result) : null;
    }
}

module.exports = MongoCategoryRepository;
