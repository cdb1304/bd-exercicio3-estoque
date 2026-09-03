import { InterfaceEstoque } from '../interface/InterfaceEstoque';

export async function lerEstoque(URL_DA_API: string) {
   let estoques: InterfaceEstoque[] = [];

   await fetch(URL_DA_API)
      .then((resposta) => resposta.json())
      .then((dados: InterfaceEstoque[]) => {
         estoques = dados;
      })
      .catch((erro) => console.error('Erro ao buscar estoque no banco de dados:', erro));

   return estoques;
}