import { Alert } from 'react-native';
import { InterfaceEstoque } from '../interface/InterfaceEstoque';

export async function salvarEstoque(
   idEdicao: number | undefined,
   estoque: InterfaceEstoque,
   URL_DA_API: string
) {
   const { id_filial, id_produto, quantidade } = estoque;

   if (!id_filial || !id_produto || quantidade === undefined || quantidade === null) {
      Alert.alert('Erro', 'Por favor, realize o preenchimento de todos os campos!');
      return;
   }

   const dadosEstoque = {
      id_filial,
      id_produto,
      quantidade
   };

   const urlFinal = idEdicao === undefined
      ? URL_DA_API
      : `${URL_DA_API}/${idEdicao}`;
   const metodoHttp = idEdicao === undefined ? 'POST' : 'PUT';

   await fetch(urlFinal, {
      method: metodoHttp,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dadosEstoque)
   })
      .then((resposta) => resposta.json())
      .then(() => {
         Alert.alert(
            'Sucesso!',
            idEdicao === undefined
               ? 'Estoque cadastrado no MySQL!'
               : 'Estoque atualizado no MySQL!'
         );
      })
      .catch((erro) => console.error('Erro ao processar requisição no servidor:', erro));
}