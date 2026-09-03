import { InterfaceFilial } from '../interface/InterfaceFilial';

export async function lerFilial(URL_DA_API: string) {
   let filiais: InterfaceFilial[] = [];

   await fetch(URL_DA_API)
      .then((resposta) => resposta.json())
      .then((dados: InterfaceFilial[]) => {
         filiais = dados;
      })
      .catch((erro) => console.error('Erro ao buscar filiais no banco de dados:', erro));

   return filiais;
}