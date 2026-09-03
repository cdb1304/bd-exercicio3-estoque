import { Alert } from 'react-native';
import { InterfaceProduto } from '../interface/InterfaceProduto';

export async function salvarProduto(
   idEdicao: number | undefined,
   produto: InterfaceProduto,
   URL_DA_API: string
) {
   const { nome, preco, categoria } = produto;

   if (!nome || !preco || !categoria) {
      Alert.alert('Erro', 'Por favor, realize o preenchimento de todos os campos!');
      return;
   }

   const dadosProduto = {
      nome: nome.trim(),
      preco,
      categoria: categoria.trim()
   };

   const urlFinal = idEdicao === undefined
      ? URL_DA_API
      : `${URL_DA_API}/${idEdicao}`;
   const metodoHttp = idEdicao === undefined ? 'POST' : 'PUT';

   await fetch(urlFinal, {
      method: metodoHttp,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dadosProduto)
   })
      .then((resposta) => resposta.json())
      .then(() => {
         Alert.alert(
            'Sucesso!',
            idEdicao === undefined
               ? 'Produto cadastrado no MySQL!'
               : 'Produto atualizado no MySQL!'
         );
      })
      .catch((erro) => console.error('Erro ao processar requisição no servidor:', erro));
}