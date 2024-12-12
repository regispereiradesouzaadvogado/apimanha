const express= require('express');
const router= express.Router();
const pedidoController= require('../controller/pedidocontroller');

router.get('/clientes', pedidoController.listarPedido);

router.get('/clientes/:cpf', pedidoControllerController.listarPedidoIdPedido);

router.post('/clientes', pedidoController.adicionarPedido);

router.put('/clientes/:cpf', pedidoController.atualizarPedido);

router.delete('pedido/:idPedido', pedidoController.deletarPedido);

module.exports = router;