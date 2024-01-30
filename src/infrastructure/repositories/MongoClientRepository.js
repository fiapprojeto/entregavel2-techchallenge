// src/infrastructure/repositories/MongoClientRepository.js

const mongoose = require('mongoose');
const Client = require('../../domain/entities/Client');
const ClientRepositoryPort = require('../../ports/ClientRepositoryPort');

const clientSchema = new mongoose.Schema({
    cpf: { type: String, unique: true },
    nome: String,
    email: String,
});

const ClientModel = mongoose.model('Client', clientSchema);

class MongoClientRepository extends ClientRepositoryPort {
    async create(client) {
        const createdClient = await ClientModel.create(client);
        return new Client(createdClient.toObject());
    }

    async getByCpf(cpf) {
        const clientData = await ClientModel.findOne({ cpf }).lean();
        return clientData ? new Client(clientData) : null;
    }

    async updateByCpf(cpf, updatedClient) {
        const result = await ClientModel.findOneAndUpdate({ cpf }, updatedClient, { new: true }).lean();
        return result ? new Client(result) : null;
    }

    async deleteByCpf(cpf) {
        const result = await ClientModel.findOneAndRemove({ cpf }).lean();
        return result ? new Client(result) : null;
    }
}

module.exports = MongoClientRepository;
