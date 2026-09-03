import { InterfaceProduto } from '../interface/InterfaceProduto';

export interface PropriedadesProduto {
   item: InterfaceProduto;
   iniciarEdicao: (produto: InterfaceProduto) => void;
   excluirProduto: (id: number | undefined) => void;
}