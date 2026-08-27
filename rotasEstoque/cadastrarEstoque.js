import bd from '../bd.js';

export default function cadastrarEstoque(req, res) {
  const { id_filial, id_produto, quantidade } = req.body;

  if (!id_filial || !id_produto) 
    return res.status(400).json({ msg_erro: 'id_filial e id_produto são obrigatórios!' });
  
  const query = 'INSERT INTO estoque (id_filial, id_produto, quantidade) VALUES (?, ?, ?)';

  bd.query(query, [id_filial, id_produto, quantidade ?? 0], (erro, resultado) => {
    if (erro) 
      return res.status(500).json({ msg_erro: erro.message });

    res.status(201).json({ id: resultado.insertId, id_filial, id_produto, quantidade: quantidade ?? 0 });
  });
}