import express from 'express';
import cors from 'cors';

// Rotas de filial
import listarFilial from './rotasFilial/listarFilial.js';
import buscarFilialPorId from './rotasFilial/buscarFilialPorId.js';
import cadastrarFilial from './rotasFilial/cadastrarFilial.js';
import atualizarFilial from './rotasFilial/atualizarFilial.js';
import removerFilial from './rotasFilial/removerFilial.js';

// Rotas de produto
import listarProduto from './rotasProduto/listarProduto.js';
import buscarProdutoPorId from './rotasProduto/buscarProdutoPorId.js';
import cadastrarProduto from './rotasProduto/cadastrarProduto.js';
import atualizarProduto from './rotasProduto/atualizarProduto.js';
import removerProduto from './rotasProduto/removerProduto.js';

// Rotas de estoque
import listarEstoque from './rotasEstoque/listarEstoque.js';
import buscarEstoquePorId from './rotasEstoque/buscarEstoquePorId.js';
import cadastrarEstoque from './rotasEstoque/cadastrarEstoque.js';
import atualizarEstoque from './rotasEstoque/atualizarEstoque.js';
import removerEstoque from './rotasEstoque/removerEstoque.js';

const app = express();
app.use(cors());
app.use(express.json());

// Filial
app.get('/filiais', listarFilial);
app.get('/filiais/:id', buscarFilialPorId);
app.post('/filiais', cadastrarFilial);
app.put('/filiais/:id', atualizarFilial);
app.delete('/filiais/:id', removerFilial);

// Produto
app.get('/produtos', listarProduto);
app.get('/produtos/:id', buscarProdutoPorId);
app.post('/produtos', cadastrarProduto);
app.put('/produtos/:id', atualizarProduto);
app.delete('/produtos/:id', removerProduto);

// Estoque
app.get('/estoque', listarEstoque);
app.get('/estoque/:id', buscarEstoquePorId);
app.post('/estoque', cadastrarEstoque);
app.put('/estoque/:id', atualizarEstoque);
app.delete('/estoque/:id', removerEstoque);

const PORTA = 3000;
app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});