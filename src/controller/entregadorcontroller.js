const db= require('../db/db');
const Joi= require('joi');

const entregadorSchema = Joi.object({
    idEntregador: Joi.string().length(30).required(),
    nome: Joi.string().required().max(50),
    cnh: Joi.string().required().max(30),
    telefoneEntregador: Joi.string().required().max(20),
});

exports.listarEntregadoridEntregador = async (req, res) =>
{
    const { idEntregador } = req.params;
    try {
        const [result] = await db.query ('SELECT * FROM cliente WHERE idEntregador= ?', [idEntregador]);
        if (result.length === 0) {
            return res.status(404).json({
                error: 'Cliente não encontrado'
            });
        }
        res.json (result);
    } catch (err) {
        console.error('Erro ao buscar cliente:', err);
        res.status(500).json({ error: 'erro interno do servidor' });
    }
};

exports.adicionarEntregador = async (req, res) => {

    const { idEntregador, nome, cnh, telefoneEntregador } = req.body; 
    const { error } = entregadorSchema.validate({ idEntregador, nome, cnh, telefoneEntregador });
    if (error) {
        return res.status(400).json({ error: error.details[0].message }); 
    }
    try{
        const novoEntregador = { idEntregador, nome, cnh, telefoneEntregador };
        await db.query('INSERT INTO entregador SET?', novoEntregador);
        res.json({ message: 'Entregador adicionado com sucesso' }); 
    }
}