import { InterfaceFilial } from '../interface/InterfaceFilial';

export interface PropriedadesFilial {
   item: InterfaceFilial;
   iniciarEdicao: (filial: InterfaceFilial) => void;
   excluirFilial: (id: number | undefined) => void;
}