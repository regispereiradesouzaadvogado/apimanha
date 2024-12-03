const express=require('express');
const router=express.Router();

//exemplo de uma rota GET
router.get('/usuario', (req,res) =>
    {
    res.send('Rota do usuário');
});

//exemplo de outra rota

router.get('/sandro', (req,res) => {
    res.send('Rota do Sandro');
})

//exporte o roteador para que ele possa ser usado no index.js
module.exports= router;