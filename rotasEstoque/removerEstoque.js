import bd from '../bd.js';

export default function removerEstoque(req, res) {
  const { id } = req.params;

  const query = 'DELETE FROM estoque WHERE id_estoque = ?';

  bd.query(query, [id], (erro, resultado) => {
    if (erro) 
      return res.status(500).json({ msg_erro: erro.message });

    if (resultado.affectedRows === 0) 
      return res.status(404).json({ mensagem: 'Registro de estoque não encontrado!' });

    res.json({ mensagem: 'Registro de estoque removido com sucesso!' });
  });
}