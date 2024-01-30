// src/adapters/routes/clientRoutes.js

const express = require('express');
const ClientController = require('../controllers/ClientController');

function createClientRoutes({ clientService }) {
    const clientController = new ClientController({ clientService });
    const router = express.Router();

    router.post('/', clientController.createClient.bind(clientController));
    router.get('/:cpf', clientController.getClientByCpf.bind(clientController));
    router.put('/:cpf', clientController.updateClientByCpf.bind(clientController));
    router.delete('/:cpf', clientController.deleteClientByCpf.bind(clientController));
    router.get('/:cpf/exists', clientController.clientExists.bind(clientController));    

    return router;
}

module.exports = createClientRoutes;
