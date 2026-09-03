import { InterfaceProduto } from '../interface/InterfaceProduto';

export async function lerProduto(URL_DA_API: string) {
   let produtos: InterfaceProduto[] = [];

   await fetch(URL_DA_API)
      .then((resposta) => resposta.json())
      .then((dados: InterfaceProduto[]) => {
         produtos = dados;
      })
      .catch((erro) => console.error('Erro ao buscar produtos no banco de dados:', erro));

   return produtos;
}