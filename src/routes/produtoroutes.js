const express= require('express');
const router= express.Router();
const produtoController= require('../controller/produtocontroller');

router.get('/produto', produtoController.listarProduto);

router.get('produto/:idProduto',produtoController.listarProdutoIdProduto);

router.post('/produto', produtoController.adicionarProduto);

router.post('/produto/:idProduto', produtoController.atualizarProduto);

router.delete('cliente/: cpf', produtoController.deletarProduto);

module.exports = router;