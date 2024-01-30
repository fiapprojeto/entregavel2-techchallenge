// src/ports/OrderRepositoryPort.js

class OrderRepositoryPort {
    async create(order) { }
    async getById(orderId) { }
    async getStatusById(orderId) { }
    async updateStatus(orderId, status) { }
    async getAll() { }
    async getProcessing() { }
}

module.exports = OrderRepositoryPort;
