import bd from '../bd.js';

export default function cadastrarProduto(req, res) {
  const { nome, preco, categoria } = req.body;

  if (!nome || !preco || !categoria) 
    return res.status(400).json({ msg_erro: 'Todos os campos são obrigatórios!' });
  
  const query = 'INSERT INTO produto (nome, preco, categoria) VALUES (?, ?, ?)';

  bd.query(query, [nome, preco, categoria], (erro, resultado) => {
    if (erro) 
      return res.status(500).json({ msg_erro: erro.message });

    res.status(201).json({ id: resultado.insertId, nome, preco, categoria });
  });
}