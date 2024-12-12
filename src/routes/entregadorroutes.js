const express= require('express');
const router= express.Router();
const entregadorController= require('../controller/entregadorcontroller');

router.get('/entregador', entregadorController.listarEntregador);

router.get('/entregador/:idEntregador', entregadorController.listarEntregador);

router.post('/entregador', idEntregadorController.adicionarCliente);

router.put('/entregador/:idEntregador', idEntregadorController.atualizarEntregador);


router.delete('entregador/:idEntregador', entregadorController.deletarEntregador);

module.exports = router;