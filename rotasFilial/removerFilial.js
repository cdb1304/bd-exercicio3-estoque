import bd from '../bd.js';

export default function removerFilial(req, res) {
  const { id } = req.params;

  const query = 'DELETE FROM filial WHERE id_filial = ?';

  bd.query(query, [id], (erro, resultado) => {
    if (erro) 
      return res.status(500).json({ msg_erro: erro.message });

    if (resultado.affectedRows === 0) 
      return res.status(404).json({ mensagem: 'Filial não encontrada!' });

    res.json({ mensagem: 'Filial removida com sucesso!' });
  });
}