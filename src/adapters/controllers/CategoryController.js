// src/adapters/controllers/CategoryController.js

class CategoryController {
    constructor({ categoryService }) {
        this.categoryService = categoryService;
    }

    async createCategory(req, res) {
        try {
            const categoryData = req.body;
            const createdCategory = await this.categoryService.createCategory(categoryData);
            res.status(201).json(createdCategory);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao criar categoria' });
        }
    }

    async getCategoryById(req, res) {
        try {
            const categoryId = req.params.categoryId;
            const category = await this.categoryService.getCategoryById(categoryId);

            if (category) {
                res.json(category);
            } else {
                res.status(404).json({ error: 'Categoria não encontrada' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao obter categoria por ID' });
        }
    }

    async getAllCategories(req, res) {
        try {
            const categories = await this.categoryService.getAllCategories();
            res.json(categories);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao obter todas as categorias' });
        }
    }

    async updateCategory(req, res) {
        try {
            const categoryId = req.params.categoryId;
            const updatedCategoryData = req.body;
            const updatedCategory = await this.categoryService.updateCategory(categoryId, updatedCategoryData);

            if (updatedCategory) {
                res.json(updatedCategory);
            } else {
                res.status(404).json({ error: 'Categoria não encontrada' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao atualizar categoria' });
        }
    }

    async deleteCategory(req, res) {
        try {
            const categoryId = req.params.categoryId;
            const deletedCategory = await this.categoryService.deleteCategory(categoryId);

            if (deletedCategory) {
                res.json(deletedCategory);
            } else {
                res.status(404).json({ error: 'Categoria não encontrada' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao excluir categoria' });
        }
    }

    async categoryExists(req, res) {
        try {
            const categoryId = req.params.categoryId;
            const exists = await this.categoryService.categoryExists(categoryId);

            res.json({ exists });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao verificar existência da categoria' });
        }
    }
}

module.exports = CategoryController;
