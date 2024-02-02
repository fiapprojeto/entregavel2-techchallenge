// src/infrastructure/repositories/MongoOrderRepository.js

const mongoose = require('mongoose');
const Order = require('../../domain/entities/Order');
const OrderRepositoryPort = require('../../ports/OrderRepositoryPort');

const orderSchema = new mongoose.Schema({
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Clients' },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Products' }],
    status: String,
    payment: String,
    total: Number,
    createdAt: { type: Date, default: Date.now }
});

const OrderModel = mongoose.model('Order', orderSchema);

class MongoOrderRepository extends OrderRepositoryPort {
    async create(order) {
        const createdOrder = await OrderModel.create(order);        
        return new Order(createdOrder.toObject({ getters: true, virtuals: true }));
    }

    async getById(orderId) {
        const orderData = await OrderModel.findById(orderId).lean();
        return orderData ? new Order(orderData) : null;
    }

    async getStatusById(orderId) {
        const orderData = await OrderModel.findById(orderId).lean();
        console.log(orderData);
        return orderData ? new Order(orderData) : null;
    }

    async updateStatus(orderId, status) {
        const result = await OrderModel.findByIdAndUpdate(orderId, { status }, { new: true }).lean();
        return result ? new Order(result) : null;
    }

    async updatePayment(orderId, payment) {
        const result = await OrderModel.findByIdAndUpdate(orderId, { payment }, { new: true }).lean();
        return result ? new Order(result) : null;
    }

    async getAll(sortBy = 'status', sortOrder = 'asc') {
        const sortOptions = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };
        const ordersData = await OrderModel.find().sort(sortOptions).lean();
        return ordersData.map(order => new Order(order));
    }

    async getProcessing() {
        const statusOrder = ["Pronto", "Em preparacao", "Recebido"];

        const ordersData = await OrderModel.find({
            payment: { $ne: "Finalizado" },
            status: { $in: statusOrder },
        })
            .lean();

        const sortedOrders = ordersData.sort((a, b) => {
            const statusAIndex = statusOrder.indexOf(a.status);
            const statusBIndex = statusOrder.indexOf(b.status);

            // Sort by status first
            if (statusAIndex !== statusBIndex) {
                return statusAIndex - statusBIndex;
            }

            // If status is the same, sort by creation date
            return a.createdAt - b.createdAt;
        });

        return sortedOrders.map(order => new Order(order));
    }
}

module.exports = MongoOrderRepository;
