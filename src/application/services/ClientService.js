// src/application/services/ClientService.js

const ClientRepositoryPort = require('../../ports/ClientRepositoryPort');
const Client = require('../../domain/entities/Client');

class ClientService {
    constructor({ clientRepository }) {
        this.clientRepository = clientRepository;
    }

    async createClient(clientData) {
        return this.clientRepository.create(clientData);
    }

    async getClientByCpf(cpf) {
        return this.clientRepository.getByCpf(cpf);
    }

    async updateClientByCpf(cpf, updatedClientData) {
        return this.clientRepository.updateByCpf(cpf, updatedClientData);
    }

    async deleteClientByCpf(cpf) {
        return this.clientRepository.deleteByCpf(cpf);
    }

    async clientExists(cpf) {
        const client = await this.clientRepository.getByCpf(cpf);
        return !!client;
    }
}

module.exports = ClientService;
