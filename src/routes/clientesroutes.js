const express= require('express');
const router= express.Router();
const clienteController= require('../controller/clientecontroller');// Importa o controller de clientes

//rota para listar todos os clientes
router.get('/clientes', clienteController.listarClientes);

//rota para buscar um cliente por CPF
router.get('/clientes/:cpf', clienteController.listarClientesCpf);

// rota para adicionar um novo cliente
router.post('/clientes', clienteController.adicionarCliente);

//rota para atualizar um cliente por CPF
router.put('/clientes/:cpf', clienteController.atualizarCliente);

//rota para deletar um cliente por CPF
router.delete('clientes/:cpf', clienteController.deletarCliente);

module.exports = router;