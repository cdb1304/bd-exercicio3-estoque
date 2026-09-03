import { Alert } from 'react-native';
import { InterfaceFilial } from '../interface/InterfaceFilial';

export async function salvarFilial(
   idEdicao: number | undefined,
   filial: InterfaceFilial,
   URL_DA_API: string
) {
   const { cnpj, nome, telefone, email, cep } = filial;

   if (!cnpj || !nome || !telefone || !email || !cep) {
      Alert.alert('Erro', 'Por favor, realize o preenchimento de todos os campos!');
      return;
   }

   const dadosFilial = {
      cnpj: cnpj.trim(),
      nome: nome.trim(),
      telefone: telefone.trim(),
      email: email.trim(),
      cep: cep.trim()
   };

   const urlFinal = idEdicao === undefined
      ? URL_DA_API
      : `${URL_DA_API}/${idEdicao}`;
   const metodoHttp = idEdicao === undefined ? 'POST' : 'PUT';

   await fetch(urlFinal, {
      method: metodoHttp,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dadosFilial)
   })
      .then((resposta) => resposta.json())
      .then(() => {
         Alert.alert(
            'Sucesso!',
            idEdicao === undefined
               ? 'Filial cadastrada no MySQL!'
               : 'Filial atualizada no MySQL!'
         );
      })
      .catch((erro) => console.error('Erro ao processar requisição no servidor:', erro));
}