// src/adapters/controllers/OrderController.js

class OrderController {
    constructor({ orderService, clientService, productService }) {
        this.orderService = orderService;
        this.clientService = clientService;
        this.productService = productService;
    }

    async createOrder(req, res) {
        try {
            const { cpf, products } = req.body;

            // Verifica se o cliente existe pelo CPF
            const existingClient = await this.clientService.getClientByCpf(cpf);
            if (!existingClient) {
                return res.status(404).json({ error: 'Cliente não encontrado' });
            }

            let total = 0;

            for (const product of products) {
                const productData = await this.productService.getProductById(product._id);

                if (!productData) {
                    return res.status(404).json({ error: 'Um dos produtos não estão disponivéis!' });
                }
                
                total += productData.price * 1;
            }
            
            // Cria o pedido associando ao cliente existente
            const orderData = {
                client: existingClient._id,
                products,
                status: 'Em andamento',
                payment: 'Pendente',
                total: total.toFixed(2),
            };

            const createdOrder = await this.orderService.createOrder(orderData);
            
            res.status(201).json(createdOrder);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao criar pedido' });
        }
    }

    async getOrderById(req, res) {
        try {
            const orderId = req.params.orderId;
            const order = await this.orderService.getOrderById(orderId);

            if (order) {
                res.json(order);
            } else {
                res.status(404).json({ error: 'Pedido não encontrado' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao obter pedido por ID' });
        }
    }

    async getStatusOrderById(req, res) {
        try {
            const orderId = req.params.orderId;
            const order = await this.orderService.getStatusOrderById(orderId);

            if (order) {
                res.json({ "Pagamento": order.payment});
            } else {
                res.status(404).json({ error: 'Pedido não encontrado' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao obter pedido por ID' });
        }
    }

    async updateOrderStatus(req, res) {
        try {
            const orderId = req.params.orderId;
            const { status } = req.body;
            const updatedOrder = await this.orderService.updateOrderStatus(orderId, status);

            if (updatedOrder) {
                res.json(updatedOrder);
            } else {
                res.status(404).json({ error: 'Pedido não encontrado' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao atualizar status do pedido' });
        }
    }

    async getAllOrders(req, res) {
        try {
            const orders = await this.orderService.getAllOrders();
            res.json(orders);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao obter todos os pedidos' });
        }
    }

    async getOrdersProcessing(req, res) {
        try {
            const orders = await this.orderService.getOrdersProcessing();
            res.json(orders);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao obter todos os pedidos' });
        }
    }
}

module.exports = OrderController;
