// src/domain/entities/Client.js

class Client {
    constructor({ cpf, nome, email }) {
        this.cpf = cpf;
        this.nome = nome;
        this.email = email;
    }
}

module.exports = Client;
