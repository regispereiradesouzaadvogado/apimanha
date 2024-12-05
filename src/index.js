//IMPORTAÇÃO DE TODAS AS DEPENDÊNCIAS
require(`dotenv`).config();
//Carrega variáveis de ambiente de um arquivo.env
// aqui são usadas aspas simples
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const db = require('./db/db')

const routes = require('./routes/routes'); //Importa as rotas// determina rotas que pode acessar
const clienteRoutes = require ('./routes/clientesroutes')
const corsOptions ={
    origin: ['http://localhost:3333', 'https://meudominio.com'],//lista de origens permitidas
    methods: 'GET,POST,PUT, PATCH,DELETE', //Métodos HTTP permitidos
    credentials: true, // permite o envio de cookies
};

//Inicialização 
const app= express();
//O app irá receber o express e todas suas dependências
//Middlewares de sergurança e utilidades
app.use(helmet());//Protege a aplicação com headers de segurança
app.use(cors(corsOptions));//habilita o CORS
app.use(morgan('dev')); // loga as requisições no console
app.use(express.json()); //Converte os dados recebidos para JSON

//SErvindo arquivos estáticos
app.use(express.static(path.join(__dirname,'public')));// Pasta de arquivos estáticos
//O PATH RETORNA O CAMINHO DE FORMA DINÂMICA

//Rota para servir o home.html como sendo nossa página principal
app.get('/',(req,res) =>{
    res.sendFile(path.join(__dirname,'pages','home.html'));
});

//Configuração de rotas
//APÓS DECLARAR NOSSAS, AQUI FALAMOS PARA NOSSO APP USAR ELAS COMO REFERÊNCIA
app.use('/',routes);

app.use('/', clienteRoutes);

//Middleware de tratamento de erros
app.use((err,req,res,next) =>{  //função anonima
    console.error(err.stack);
    res.status(500).send('Algo deu errado!');
})

// Inicialização do servidor
// Aqui definimos quem irá escutar nosso chamado e nos responder
const PORT=process.env.PORT||3333;
app.listen(PORT,()=>{
    console.log(`Servidor rodando na porta ${PORT}`);
})