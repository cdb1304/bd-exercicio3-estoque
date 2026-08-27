import bd from '../bd.js';

export default function atualizarProduto(req, res) {
  const { id } = req.params;

  const { nome, preco, categoria } = req.body;

  if (!nome || !preco || !categoria) 
    return res.status(400).json({ msg_erro: 'Todos os campos são obrigatórios para atualização!' });
    
  const query = 'UPDATE produto SET nome = ?, preco = ?, categoria = ? WHERE id_produto = ?';

  bd.query(query, [nome, preco, categoria, id], (erro, resultado) => {
    if (erro) 
      return res.status(500).json({ msg_erro: erro.message });

    if (resultado.affectedRows === 0) 
      return res.status(404).json({ mensagem: 'Produto não encontrado para atualização!' });
    
    res.json({ mensagem: 'Produto atualizado!', id, nome, preco, categoria });
  });
}