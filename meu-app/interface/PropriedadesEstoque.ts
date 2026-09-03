import { InterfaceEstoque } from '../interface/InterfaceEstoque';

export interface PropriedadesEstoque {
   item: InterfaceEstoque;
   iniciarEdicao: (estoque: InterfaceEstoque) => void;
   excluirEstoque: (id: number | undefined) => void;
}