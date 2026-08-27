import bd from '../bd.js';

export default function cadastrarFilial(req, res) {
  const { cnpj, nome, telefone, email, cep } = req.body;

  if (!cnpj || !nome || !telefone || !email || !cep) 
    return res.status(400).json({ msg_erro: 'Todos os campos são obrigatórios!' });
  
  const query = 'INSERT INTO filial (cnpj, nome, telefone, email, cep) VALUES (?, ?, ?, ?, ?)';

  bd.query(query, [cnpj, nome, telefone, email, cep], (erro, resultado) => {
    if (erro) 
      return res.status(500).json({ msg_erro: erro.message });

    res.status(201).json({ id: resultado.insertId, cnpj, nome, telefone, email, cep });
  });
}