// src/ports/ProductRepositoryPort.js

class ProductRepositoryPort {
    async create(product) { }
    async getById(productId) { }
    async getByCategory(categoryId) { }
    async getAll() { }
    async update(productId, updatedProduct) { }
    async delete(productId) { }
}

module.exports = ProductRepositoryPort;
