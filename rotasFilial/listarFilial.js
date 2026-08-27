import bd from '../bd.js';

export default function listarFilial(req, res) {
  bd.query('SELECT * FROM filial', (erro, resultado) => {
    if (erro) 
      return res.status(500).json({ msg_erro: erro.message });
    
    res.json(resultado);
  });
}