// src/domain/entities/Order.js

class Order {
    constructor({ _id, client, products, status, payment, total, createdAt }) {
        this._id = _id;
        this.client = client;
        this.products = products;
        this.status = status;
        this.payment = payment;
        this.total = total;
        this.createdAt = createdAt;
    }
}

module.exports = Order;