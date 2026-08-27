import bd from '../bd.js';

export default function atualizarEstoque(req, res) {
  const { id } = req.params;

  const { id_filial, id_produto, quantidade } = req.body;

  if (!id_filial || !id_produto || quantidade === undefined) 
    return res.status(400).json({ msg_erro: 'id_filial, id_produto e quantidade são obrigatórios para atualização!' });
    
  const query = 'UPDATE estoque SET id_filial = ?, id_produto = ?, quantidade = ? WHERE id_estoque = ?';

  bd.query(query, [id_filial, id_produto, quantidade, id], (erro, resultado) => {
    if (erro) 
      return res.status(500).json({ msg_erro: erro.message });

    if (resultado.affectedRows === 0) 
      return res.status(404).json({ mensagem: 'Registro de estoque não encontrado para atualização!' });
    
    res.json({ mensagem: 'Estoque atualizado!', id, id_filial, id_produto, quantidade });
  });
}