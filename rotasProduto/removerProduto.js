import bd from '../bd.js';

export default function removerProduto(req, res) {
  const { id } = req.params;

  const query = 'DELETE FROM produto WHERE id_produto = ?';

  bd.query(query, [id], (erro, resultado) => {
    if (erro) 
      return res.status(500).json({ msg_erro: erro.message });

    if (resultado.affectedRows === 0) 
      return res.status(404).json({ mensagem: 'Produto não encontrado!' });

    res.json({ mensagem: 'Produto removido com sucesso!' });
  });
}