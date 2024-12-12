const db = require('../db/db');
const Joi = require('joi'); 
const bcrypt = require('bcrypt'); 

const pedidoSchema = Joi.object({
    idPedido: Joi.string().length(30).required(),
    dataPedito: Joi.string().required().max(10),
    qtdeItens: Joi.string().required().max(30),
    formaPagto: Joi.string().required().max(30),
    valorTotal: Joi.string().required().max(30),
    observacao: Joi.string().required().max(100),
    cpf: Joi.string().length(11).required(),
    email: Joi.string().email().max(50),
    idEntregador: Joi.string().length(20).required()
});


exports.listarPedido = async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM pedido');
        res.json(result); 
    } catch (err) {
        console.error('Erro ao buscar produto:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};


exports.listarProdutoIdProduto = async (req, res) => {
    const { idProduto } = req.params;
    try {
        const [result] = await db.query('SELECT * FROM cliente WHERE idProduto = ?', [idProduto]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        res.json(result);
    } catch (err) {
        console.error('Erro ao buscar produto:', err);
        res.status(500).json({ error: 'erro interno do servidor' });
    }
};

exports.adicionarProduto = async (req, res) => {

    const { idPedido, dataPedito, qtdeItens,formaPagto, valorTotal, observacao, cpf, idEntregador} = req.body;

    const { error } = produtoSchema.validate({ cidPedido, dataPedito, qtdeItens,formaPagto, valorTotal, observacao, cpf, idEntregador });
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        
        const novoProduto = { idPedido, dataPedito, qtdeItens,formaPagto, valorTotal, observacao, cpf, idEntregador };
        await db.query('INSERT INTO cliente SET?', novoProduto);
        res.json({ message: 'Produto adicionado com sucesso' });
    } catch (err) {
        console.error('Erro ao adicionar produto:', err);
        res.status(500).json({ error: 'Erro ao adicionar produto' });
    }
};


exports.atualizarProduto = async (req, res) => {
    const { idPedido } = req.params;
    const { dataPedito, qtdeItens,formaPagto, valorTotal, observacao, cpf, idEntregador } = req.body;
    
    const { error } = clienteSchema.validate({ idPedido, dataPedito, qtdeItens,formaPagto, valorTotal, observacao, cpf, idEntregador});
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        
        const [result] = await db.query('SELECT * FROM cliente WHERE idPedido=?', [idPedido]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'Pedido não encontrado' });
        }
        
        const pedidoAtualizado = { idPedido, dataPedito, qtdeItens,formaPagto, valorTotal, observacao, cpf, idEntregador};
        await db.query('UPDATE cliente SET ? WHERE idPedido= ?', [pedidoAtualizado, cpf]);
        res.json({ message: 'Pedido atualizado com sucesso' });

    } catch (err) {
        console.error('Erro ao atualizar produto:', err);
        res.status(500).json({ erro: 'Erro ao atualizar produto' });
    }
};

exports.deletarProduto = async (req, res) => {
    const { idProduto } = req.params;
    try {
        //verifica se o cliente existe antes de deletar
        const [result] = await db.query('SELECT * FROM cliente WHERE idProduto = ?', [idProduto]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        await db.query('DELETE FROM produto WHERE idProduto=?', [idProduto]);
        res.json({ message: 'Produto deletado com sucesso' });
    } catch (err) {
        console.error('Erro ao deletar produto:', err);
        res.status(500).json({ error: 'Erro ao deletar produto' });
    }
};