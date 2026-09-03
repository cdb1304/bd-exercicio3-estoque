import { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, FlatList, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { InterfaceEstoque } from '../interface/InterfaceEstoque';
import FormularioEstoque from './FormularioEstoque';
import ItemEstoque from './ItemEstoque';
import { lerEstoque } from '../api/lerEstoque';
import { salvarEstoque } from '../api/salvarEstoque';
import { excluirEstoque } from '../api/excluirEstoque';

const URL: string = 'https://SUA-URL-PUBLICA.app.github.dev/';
const URL_DA_API: string = URL + 'estoque';

export default function PrincipalEstoque() {
   const [estoques, setEstoques] = useState<InterfaceEstoque[]>([]);
   const [carregando, setCarregando] = useState<boolean>(true);
   const [idFilial, setIdFilial] = useState<string>('');
   const [idProduto, setIdProduto] = useState<string>('');
   const [quantidade, setQuantidade] = useState<string>('');
   const [idEdicao, setIdEdicao] = useState<number | undefined>(undefined);

   const carregar = () => {
      lerEstoque(URL_DA_API).then((dados) => {
         setEstoques(dados);
         setCarregando(false);
      });
   };

   const limparFormulario = () => {
      setIdEdicao(undefined);
      setIdFilial('');
      setIdProduto('');
      setQuantidade('');
   };

   const salvar = async (id: number | undefined, estoque: InterfaceEstoque) => {
      await salvarEstoque(id, estoque, URL_DA_API);
      limparFormulario();
      carregar();
   };

   const excluir = async (id: number) => {
      const removido = await excluirEstoque(id, URL_DA_API);
      if (removido) {
         if (idEdicao === id) {
            limparFormulario();
         }
         carregar();
      }
   };

   const iniciarEdicao = (estoque: InterfaceEstoque) => {
      setIdEdicao(estoque.id_estoque);
      setIdFilial(estoque.id_filial.toString());
      setIdProduto(estoque.id_produto.toString());
      setQuantidade(estoque.quantidade.toString());
   };

   useEffect(() => {
      carregar();
   }, []);

   return (
      <SafeAreaProvider>
         <KeyboardAvoidingView
            style={estilos.teclado}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
         >
            <SafeAreaView style={estilos.container}>
               <Text style={estilos.titulo}>Painel CRUD Estoque (MySQL)</Text>
               <FormularioEstoque
                  idFilial={idFilial} setIdFilial={setIdFilial}
                  idProduto={idProduto} setIdProduto={setIdProduto}
                  quantidade={quantidade} setQuantidade={setQuantidade}
                  idEdicao={idEdicao}
                  salvarDados={salvar}
                  limparFormulario={limparFormulario}
               />

               {carregando ? (
                  <ActivityIndicator size="large" color="#0000ff" />
               ) : (
                  <FlatList
                     style={estilos.lista}
                     contentContainerStyle={estilos.conteudoLista}
                     data={estoques}
                     keyExtractor={(item) => item.id_estoque?.toString() || Math.random().toString()}
                     renderItem={({ item }) => (
                        <ItemEstoque
                           item={item}
                           iniciarEdicao={iniciarEdicao}
                           excluirEstoque={(id) => {
                              if (id !== undefined) {
                                 excluir(id);
                              }
                           }}
                        />
                     )}
                  />
               )}
            </SafeAreaView>
         </KeyboardAvoidingView>
      </SafeAreaProvider>
   );
}

const estilos = StyleSheet.create({
   teclado: { flex: 1 },
   container: { flex: 1, width: '100%', backgroundColor: '#f5f5f5', paddingHorizontal: 16, paddingTop: 10 },
   lista: { flex: 1, width: '100%' },
   conteudoLista: { paddingBottom: 24 },
   titulo: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 12 }
});