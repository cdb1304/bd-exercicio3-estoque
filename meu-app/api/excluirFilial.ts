import { Alert, Platform } from 'react-native';

export async function excluirFilial(id: number, URL_DA_API: string): Promise<boolean> {
   const mensagem = 'Deseja realmente apagar este registro do banco de dados?';

   if (Platform.OS === 'web') {
      if (!window.confirm(mensagem)) {
         return false;
      }
   } else {
      const confirmado = await new Promise<boolean>((resolve) => {
         Alert.alert('Confirmar Exclusão', mensagem, [
            { text: 'Cancelar', style: 'cancel', onPress: () => resolve(false) },
            { text: 'Excluir', style: 'destructive', onPress: () => resolve(true) }
         ]);
      });

      if (!confirmado) {
         return false;
      }
   }

   try {
      const resposta = await fetch(`${URL_DA_API}/${id}`, { method: 'DELETE' });

      if (!resposta.ok) {
         throw new Error(`Erro HTTP ${resposta.status}`);
      }

      const mensagemSucesso = 'O registro foi removido do Banco de Dados MySQL.';
      Platform.OS === 'web'
         ? window.alert(mensagemSucesso)
         : Alert.alert('Removido!', mensagemSucesso);
      return true;
   } catch {
      const mensagemErro = 'Ocorreu um erro ao excluir o registro.';
      Platform.OS === 'web'
         ? window.alert(mensagemErro)
         : Alert.alert('Erro', mensagemErro);
      return false;
   }
}