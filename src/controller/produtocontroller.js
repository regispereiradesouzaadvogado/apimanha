const db= require('../db/db');
const Joi = require('joi');

const produtoSchema = Joi.object({
    idProduto: Joi.string().length(30).required(),
    nomeProduto: Joi.string().required().max(30),
    descricao: Joi.string().required().max(100),
    valorUnit: Joi.string().required().max(7),
    cep: Joi.string().required().max(8),
    imagem: Joi.string().required().max(300)
});

exports.listarProduto = async (req, res) => {
    try{
        const [result] = await db.query('SELECT * FROM produto');
        res.json(result);
    } catch (err) {
        console.error('Erro ao buscar produtos:', err);
        res.status(500).json({ error: 'Erro interno no servidor'});
    }
};

exports.listarIdProduto = async (req, res) =>
{
    const { idProduto } = req.params;
    try{
        const[result] = await db.query('SELECT * FROM cliente WHERE idProduto = ?', [idProduto]);
        if (result.lenght ===0) {
            return res.status(404).json({
                error:'Produto não encontrado'});
        }
        res.json(result);
    } catch(err) {
        console.error('Erro ao buscar cliente:', err);
        res.status(500).json({error: 'erro interno no servidor' });
    }
};

//busca de produtos por nome
exports.buscarProdutoNome = async (req, res) =>{
    const { id_produto } = req.params;

    try{
        const [result] = await db.query('SELECT * FROM produto WHERE idProduto LIKE ?', [`${idProduto}]%`]);
        if (result.length===0) {
            return res.status(404).json({ error:'Produto não encontrado'});
        }
        res.json(result);
    } catch (err) {
        console.error('Erro ao buscar produto:', err);
        res.status(500).json({error: 'Erro interno do servidor'});
    }
};

exports.adicionarProduto = async (req,res) => {
    const { idProduto, nomeProduto, descricao, valorUnit, cep, imagem } = req.body;

    const {error} = produtoSchema.validate({ idProduto, nomeProduto, descricao, valorUnit, cep, imagem });
    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }
    try{
       const novoProduto = { idProduto, nomeProduto, descricao, valorUnit, cep, imagem };
       await db.query('INSERT INTO cliente SET?', novoCliente);
       res.json({ message: 'Cliente adicionado com sucesso' }); 
    } catch (err) {
        console.error('Erro ao adicionar cliente',err);
    } catch (err) {
        console.error('Erro ao adicionar cliente:', err);
        res.status(500).json({ error: 'Erro ao adicionar cliente' });
    }
};

exports.atualizarProduto => {
    const { idProduto } = req.params;
    const { nomeProduto, descricao, valorUnit, cep, imagem } = req.body;

    const { error } = produtoSchema.validate({ idProduto, nomeProduto, descricao, valorUnit, cep, imagem});
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        const [result] = await db.query('SELECT * FROM cliente WHERE idProduto=?', [idProduto]);
        if (result.length === 0) {
        return res.status(404).json({
            error:'Produto não encontrado' })
        }

        const produtoAtualizado = { nomeProduto, descricao, valorUnit, cep, imagem}
        await db.query('UPDATE cliente SET ? WHERE idProduto= ?', [produtoAtualizado,idProduto]);
        res.json({ message: 'Produto atualizado com sucesso'})
    } catch (err) {
        console.error ('Erro ao atualizar cliente', err);
        res.statu(500).json({ erro: 'Erro ao atualizar produto'})
    }
};

exports.deletarCliente = async (req, res) => {
    const { idProduto} = req.params;
    try
    const [result] = await db.query('SELECT * FROM produto WHERE idProduto=?', [idProduto]);
    if (result.length === 0) {
        return res.status(404).json([
            error: 'Produto não encontrado' ]);
        await db.query('DELETE FROM produto WHERE produto=?', [produto]);
        res.json({message: 'Produto deletado com sucesso'});
    } catch (err) {
        console.error('Erro ao deletar cliente:', err);
        res.status(500).json({ error: 'Erro ao deletar cliente' });
    }
};
