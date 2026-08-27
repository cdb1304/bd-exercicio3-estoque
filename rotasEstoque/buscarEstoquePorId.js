import bd from '../bd.js';

export default function buscarEstoquePorId(req, res) {
  const { id } = req.params;

  const query = 'SELECT * FROM estoque WHERE id_estoque = ?';

  bd.query(query, [id], (erro, resultado) => {
    if (erro) 
      return res.status(500).json({ msg_erro: erro.message });

    if (resultado.length === 0) 
      return res.status(404).json({ msg_erro: `Nenhum registro de estoque encontrado com ID ${id}.` });
  
    return res.json(resultado[0]);
  });
}