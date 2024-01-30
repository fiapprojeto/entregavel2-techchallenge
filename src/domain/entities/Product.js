// src/domain/entities/Product.js

class Product {
    constructor({ name, description, price, category }) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category; // Adiciona a propriedade de categoria
    }
}

module.exports = Product;
