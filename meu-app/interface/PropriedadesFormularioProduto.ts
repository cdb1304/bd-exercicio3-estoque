import { InterfaceProduto } from '../interface/InterfaceProduto';

export interface PropriedadesFormularioProduto {
   nome: string;
   setNome: (texto: string) => void;
   preco: string;
   setPreco: (texto: string) => void;
   categoria: string;
   setCategoria: (texto: string) => void;
   idEdicao: number | undefined;
   salvarDados: (idEdicao: number | undefined, produto: InterfaceProduto) => void;
   limparFormulario: () => void;
}