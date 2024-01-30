// src/adapters/controllers/ClientController.js

class ClientController {
    constructor({ clientService }) {
        this.clientService = clientService;
    }

    async createClient(req, res) {
        try {
            const clientData = req.body;
            const createdClient = await this.clientService.createClient(clientData);
            res.status(201).json(createdClient);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao criar cliente' });
        }
    }

    async getClientByCpf(req, res) {
        try {
            const cpf = req.params.cpf;
            const client = await this.clientService.getClientByCpf(cpf);

            if (client) {
                res.json(client);
            } else {
                res.status(404).json({ error: 'Cliente não encontrado' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao obter cliente por CPF' });
        }
    }

    async updateClientByCpf(req, res) {
        try {
            const cpf = req.params.cpf;
            const updatedClientData = req.body;
            const updatedClient = await this.clientService.updateClientByCpf(cpf, updatedClientData);

            if (updatedClient) {
                res.json(updatedClient);
            } else {
                res.status(404).json({ error: 'Cliente não encontrado' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao atualizar cliente' });
        }
    }

    async deleteClientByCpf(req, res) {
        try {
            const cpf = req.params.cpf;
            const deletedClient = await this.clientService.deleteClientByCpf(cpf);

            if (deletedClient) {
                res.json(deletedClient);
            } else {
                res.status(404).json({ error: 'Cliente não encontrado' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao excluir cliente' });
        }
    }

    async clientExists(req, res) {
        try {
            const cpf = req.params.cpf;
            const exists = await this.clientService.clientExists(cpf);

            res.json({ exists });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao verificar existência do cliente' });
        }
    }
}

module.exports = ClientController;
