const db= require('../db/db');
const Joi = require('joi');

const produtoSchema = Joi.object({
    idProduto: Joi.string().length(30).required(),
    nomeProduto: Joi.string().required().max(30),
    descricao: Joi.string().required().max(100),
    valorUnit: Joi.string().required().max(7),
    imagem: Joi.string().required().max(200),
    cep: Joi.string().required().max(8),
    imagem: Joi.string().required().max(300)
});

exports.listarProduto = async (req, res) => {
    try{
        const [result] = await db.query('SELECT * FROM produto');
        res.json(result);
    } catch (err) {
        console.erro('Erro ao buscar produtos:', err);
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
        const [result] = await db.query('SELECT * FROM produto WHERE idProduto LIKE ?', ['${idProduto'});
    }
}