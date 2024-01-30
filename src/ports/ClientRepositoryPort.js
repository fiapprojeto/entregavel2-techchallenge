// src/ports/ClientRepositoryPort.js

class ClientRepositoryPort {
    async create(client) { }
    async getByCpf(cpf) { }
    async updateByCpf(cpf, updatedClient) { }
    async deleteByCpf(cpf) { }
}

module.exports = ClientRepositoryPort;
