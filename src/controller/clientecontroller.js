const db = require('../db/db');//módulo de conexão com o banco de dados
const Joi = require('joi'); //biblioteca de validação de dados
const bcrypt = require('bcrypt'); //para encriptação de senhas

//Validação com Joi
const clienteSchema = Joi.object({
    cpf: Joi.string().length(11).required(),
    //CPF de ser uma string de exatamente 11 carecteres
    nome: Joi.string().required().max(50),
    //nome deve ser uma string e é obrigatório
    endereco: Joi.string().required().max(80),
    //endereço deve ser uma string e é obrigatório
    bairro: Joi.string().required().max(30),
    cidade: Joi.string().required().max(30),
    cep: Joi.string().required().max(8),
    telefone: Joi.string().required(),
    email: Joi.string().email().max(50),//deve ser válido e é obrigatório
    senha: Joi.string().required().max(300)
});

//Listar todos os clientes
exports.listarClientes = async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM cliente');
        res.json(result); //Aqui retornamos apenas os dados da consulta
    } catch (err) {
        console.error('Erro ao buscar clientes:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

//buscar um cliente por CPF
exports.listarClientesCpf = async (req, res) => {
    const { cpf } = req.params;
    try {
        const [result] = await db.query('SELECT * FROM cliente WHERE cpf = ?', [cpf]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        res.json(result);
    } catch (err) {
        console.error('Erro ao buscar cliente:', err);
        res.status(500).json({ error: 'erro interno do servidor' });
    }
};

//Adicionar novo cliente
exports.adicionarCliente = async (req, res) => {

    const { cpf, nome, endereco, bairro, cidade, cep, telefone, email, senha } = req.body;

    // validação de dados
    const { error } = clienteSchema.validate({ cpf, nome, endereco, bairro, cidade, cep, telefone, email, senha });
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        //criptografando a senha
        const hash = await bcrypt.hash(senha, 10);

        const novoCliente = { cpf, nome, endereco, bairro, cidade, cep, telefone, email, senha: hash };
        await db.query('INSERT INTO cliente SET?', novoCliente);
        res.json({ message: 'Cliente adicionado com sucesso' });
    } catch (err) {
        console.error('Erro ao adicionar cliente:', err);
        res.status(500).json({ error: 'Erro ao adicionar cliente' });
    }
};

// atualizar cliente
exports.atualizarCliente = async (req, res) => {
    const { cpf } = req.params;
    const { nome, endereco, bairro, cidade, cep, telefone, email, senha } = req.body;
    //validação de dados
    const { error } = clienteSchema.validate({ cpf, nome, endereco, bairro, cidade, cep, telefone, email, senha });
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        //verifica se o cliente existe antes de atualizar
        const [result] = await db.query('SELECT * FROM cliente WHERE cpf=?', [cpf]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        //Criptografando a senha
        const hash = await bcrypt.hash(senha, 10);
        const clienteAtualizado = { nome, endereco, bairro, cidade, cep, telefone, email, senha: hash };
        await db.query('UPDATE cliente SET ? WHERE cpf= ?', [clienteAtualizado, cpf]);
        res.json({ message: 'Cliente atualizado com sucesso' });

    } catch (err) {
        console.error('Erro ao atualizar cliente:', err);
        res.status(500).json({ erro: 'Erro ao atualizar cliente' });
    }
};

exports.deletarCliente = async (req, res) => {
    const { cpf } = req.params;
    try {
        //verifica se o cliente existe antes de deletar
        const [result] = await db.query('SELECT * FROM cliente WHERE cpf = ?', [cpf]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        await db.query('DELETE FROM cliente WHERE cpf=?', [cpf]);
        res.json({ message: 'Cliente deletado com sucesso' });
    } catch (err) {
        console.error('Erro ao deletar cliente:', err);
        res.status(500).json({ error: 'Erro ao deletar cliente' });
    }
};