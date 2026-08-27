import bd from '../bd.js';

export default function buscarFilialPorId(req, res) {
  const { id } = req.params;

  const query = 'SELECT * FROM filial WHERE id_filial = ?';

  bd.query(query, [id], (erro, resultado) => {
    if (erro) 
      return res.status(500).json({ msg_erro: erro.message });

    if (resultado.length === 0) 
      return res.status(404).json({ msg_erro: `Nenhuma filial encontrada com ID ${id}.` });
  
    return res.json(resultado[0]);
  });
}