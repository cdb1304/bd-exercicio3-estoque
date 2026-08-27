import bd from '../bd.js';

export default function listarEstoque(req, res) {
  bd.query('SELECT * FROM estoque', (erro, resultado) => {
    if (erro) 
      return res.status(500).json({ msg_erro: erro.message });
    
    res.json(resultado);
  });
}