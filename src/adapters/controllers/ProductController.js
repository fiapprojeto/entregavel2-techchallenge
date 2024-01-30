// src/adapters/controllers/ProductController.js

class ProductController {
    constructor({ productService, categoryService }) {
        this.productService = productService;
        this.categoryService = categoryService;
    }

    async createProduct(req, res) {
        const productData = req.body;
        const createdProduct = await this.productService.createProduct(productData);
        res.json(createdProduct);
    }

    async getProductById(req, res) {
        const productId = req.params.productId;
        const product = await this.productService.getProductById(productId);
        res.json(product);
    }

    async getProductByCategory(req, res) {
        const categoryId = req.params.categoryId;

        const existingCategory = await this.categoryService.getCategoryById(categoryId);
        //console.log(existingCategory);
        if (!existingCategory) {
            return res.status(404).json({ error: 'Categoria não encontrada' });
        }

        const product = await this.productService.getProductByCategory(categoryId);        
        //console.log("product", product);
        res.json(product);
    }

    async getAllProducts(req, res) {
        const products = await this.productService.getAllProducts();
        res.json(products);
    }

    async updateProduct(req, res) {
        const productId = req.params.productId;
        const updatedProductData = req.body;
        const updatedProduct = await this.productService.updateProduct(productId, updatedProductData);
        res.json(updatedProduct);
    }

    async deleteProduct(req, res) {
        const productId = req.params.productId;
        const deletedProduct = await this.productService.deleteProduct(productId);
        res.json(deletedProduct);
    }
}

module.exports = ProductController;
