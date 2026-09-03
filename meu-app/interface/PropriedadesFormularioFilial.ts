import { InterfaceFilial } from '../interface/InterfaceFilial';

export interface PropriedadesFormularioFilial {
   cnpj: string;
   setCnpj: (texto: string) => void;
   nome: string;
   setNome: (texto: string) => void;
   telefone: string;
   setTelefone: (texto: string) => void;
   email: string;
   setEmail: (texto: string) => void;
   cep: string;
   setCep: (texto: string) => void;
   idEdicao: number | undefined;
   salvarDados: (idEdicao: number | undefined, filial: InterfaceFilial) => void;
   limparFormulario: () => void;
}