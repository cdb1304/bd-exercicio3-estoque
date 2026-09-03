import { InterfaceEstoque } from '../interface/InterfaceEstoque';

export interface PropriedadesFormularioEstoque {
   idFilial: string;
   setIdFilial: (texto: string) => void;
   idProduto: string;
   setIdProduto: (texto: string) => void;
   quantidade: string;
   setQuantidade: (texto: string) => void;
   idEdicao: number | undefined;
   salvarDados: (idEdicao: number | undefined, estoque: InterfaceEstoque) => void;
   limparFormulario: () => void;
}