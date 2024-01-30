// src/infrastructure/schemas/productSchema.js

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, // Referência à categoria
});

module.exports = productSchema;
