// src/application/services/ProductService.js

const ProductRepositoryPort = require('../../ports/ProductRepositoryPort');
const CategoryRepositoryPort = require('../../ports/CategoryRepositoryPort');

class ProductService {
    constructor({ productRepository, categoryService }) {
        this.productRepository = productRepository;
        this.categoryService = categoryService;
    }

    async createProduct(productData) {
        return this.productRepository.create(productData);
    }

    async getProductById(productId) {
        return this.productRepository.getById(productId);
    }

    async getProductByCategory(categoryId) {
        return this.productRepository.getByCategory(categoryId);
    }

    async getAllProducts() {
        return this.productRepository.getAll();
    }

    async updateProduct(productId, updatedProductData) {
        // Se a categoria for fornecida, verifica se ela existe antes de atualizar o produto
        /*if (updatedProductData.category) {
            const categoryExists = await this.categoryService.categoryExists(updatedProductData.category);
            if (!categoryExists) {
                // Lida com o caso em que a categoria fornecida não existe
                throw new Error('A categoria fornecida não existe.');
            }
        }*/

        return this.productRepository.update(productId, updatedProductData);
    }

    async deleteProduct(productId) {
        return this.productRepository.delete(productId);
    }
}

module.exports = ProductService;
