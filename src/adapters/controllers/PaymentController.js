class OrderController {
    constructor({ orderService }) {
        this.orderService = orderService;
    }

    async updateOrderPayment(req, res) {
        try {
            const orderId = req.params.orderId;
            const { payment } = req.body;
            const order = await this.orderService.getStatusOrderById(orderId);

            if (!order || order.payment !== 'Pendente') {
                return res.status(404).json({ error: 'Pedido não existe ou já foi processado!' });
            }

            const updatedOrder = await this.orderService.updateOrderPayment(orderId, payment);

            if (updatedOrder) {
                return res.json(updatedOrder);
            } else {
                return res.status(500).json({ error: 'Erro ao atualizar o pagamento do pedido' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao obter pedido por ID' });
        }
    }
}

module.exports = OrderController;
