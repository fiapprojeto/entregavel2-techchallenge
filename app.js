const express = require('express');
const mongoose = require('mongoose');
const createProductRoutes = require('./src/adapters/routes/productRoutes');
const createCategoryRoutes = require('./src/adapters/routes/categoryRoutes');
const createClientRoutes = require('./src/adapters/routes/clientRoutes');
const createOrderRoutes = require('./src/adapters/routes/orderRoutes'); // Adiciona as rotas para pedidos
const ProductService = require('./src/application/services/ProductService');
const CategoryService = require('./src/application/services/CategoryService');
const ClientService = require('./src/application/services/ClientService');
const OrderService = require('./src/application/services/OrderService'); // Adiciona o serviço de pedido
const MongoProductRepository = require('./src/infrastructure/repositories/MongoProductRepository');
const MongoCategoryRepository = require('./src/infrastructure/repositories/MongoCategoryRepository');
const MongoClientRepository = require('./src/infrastructure/repositories/MongoClientRepository');
const MongoOrderRepository = require('./src/infrastructure/repositories/MongoOrderRepository'); // Adiciona o repositório de pedido

const app = express();
app.use(express.json());

// Conectar ao MongoDB
mongoose.connect('mongodb+srv://foodonline:foodonline123@fiap-entregavel2.gv3tfhe.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.set('strictQuery', true);

// Configurar serviços, repositórios e rotas
const productRepository = new MongoProductRepository();
const productService = new ProductService({ productRepository });

const categoryRepository = new MongoCategoryRepository();
const categoryService = new CategoryService({ categoryRepository });

const clientRepository = new MongoClientRepository();
const clientService = new ClientService({ clientRepository });

const orderRepository = new MongoOrderRepository(); // Cria o repositório de pedido
const orderService = new OrderService({ orderRepository }); // Cria o serviço de pedido

// Configurar rotas
const productRoutes = createProductRoutes({ productService, categoryService });
const categoryRoutes = createCategoryRoutes({ categoryService });
const clientRoutes = createClientRoutes({ clientService });
const orderRoutes = createOrderRoutes({ orderService, clientService }); // Adiciona rotas para pedidos

app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);
app.use('/clients', clientRoutes);
app.use('/orders', orderRoutes); // Adiciona rota para pedidos

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor está rodando na porta ${PORT}`);
});
