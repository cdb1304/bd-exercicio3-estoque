import bd from '../bd.js';

export default function atualizarFilial(req, res) {
  const { id } = req.params;

  const { cnpj, nome, telefone, email, cep } = req.body;

  if (!cnpj || !nome || !telefone || !email || !cep) 
    return res.status(400).json({ msg_erro: 'Todos os campos são obrigatórios para atualização!' });
    
  const query = 'UPDATE filial SET cnpj = ?, nome = ?, telefone = ?, email = ?, cep = ? WHERE id_filial = ?';

  bd.query(query, [cnpj, nome, telefone, email, cep, id], (erro, resultado) => {
    if (erro) 
      return res.status(500).json({ msg_erro: erro.message });

    if (resultado.affectedRows === 0) 
      return res.status(404).json({ mensagem: 'Filial não encontrada para atualização!' });
    
    res.json({ mensagem: 'Filial atualizada!', id, cnpj, nome, telefone, email, cep });
  });
}