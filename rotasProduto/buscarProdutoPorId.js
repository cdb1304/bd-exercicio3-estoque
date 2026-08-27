import bd from '../bd.js';

export default function buscarProdutoPorId(req, res) {
  const { id } = req.params;

  const query = 'SELECT * FROM produto WHERE id_produto = ?';

  bd.query(query, [id], (erro, resultado) => {
    if (erro) 
      return res.status(500).json({ msg_erro: erro.message });

    if (resultado.length === 0) 
      return res.status(404).json({ msg_erro: `Nenhum produto encontrado com ID ${id}.` });
  
    return res.json(resultado[0]);
  });
}