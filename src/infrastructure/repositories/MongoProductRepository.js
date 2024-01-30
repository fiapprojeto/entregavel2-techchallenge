// src/infrastructure/repositories/MongoProductRepository.js

const mongoose = require('mongoose');
const Product = require('../../domain/entities/Product');
const ProductRepositoryPort = require('../../ports/ProductRepositoryPort');
mongoose.set('strictQuery', true);
const productSchema = require('../schemas/productSchema'); // Importa o esquema atualizado
const ProductModel = mongoose.model('Product', productSchema);

class MongoProductRepository extends ProductRepositoryPort {
    async create(product) {
        const createdProduct = await ProductModel.create(product);
        return new Product(createdProduct.toObject());
    }

    async getById(productId) {
        const productData = await ProductModel.findById(productId).populate('category').lean();
        return productData ? new Product(productData) : null;
    }

    async getByCategory(categoryId) {
        const productsData = await ProductModel.find({ category: categoryId }).populate('category').lean();

        return productsData.map(productData => new Product(productData));
    }

    async getAll() {
        const productsData = await ProductModel.find().populate('category').lean();
        return productsData.map(productData => new Product(productData));
    }

    async update(productId, updatedProduct) {
        const result = await ProductModel.findByIdAndUpdate(productId, updatedProduct, { new: true }).populate('category').lean();
        return result ? new Product(result) : null;
    }

    async delete(productId) {
        const result = await ProductModel.findByIdAndRemove(productId).populate('category').lean();
        return result ? new Product(result) : null;
    }
}

module.exports = MongoProductRepository;
