import { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, FlatList, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { InterfaceProduto } from '../interface/InterfaceProduto';
import FormularioProduto from './FormularioProduto';
import ItemProduto from './ItemProduto';
import { lerProduto } from '../api/lerProduto';
import { salvarProduto } from '../api/salvarProduto';
import { excluirProduto } from '../api/excluirProduto';

const URL: string = 'https://SUA-URL-PUBLICA.app.github.dev/';
const URL_DA_API: string = URL + 'produtos';

export default function PrincipalProduto() {
   const [produtos, setProdutos] = useState<InterfaceProduto[]>([]);
   const [carregando, setCarregando] = useState<boolean>(true);
   const [nome, setNome] = useState<string>('');
   const [preco, setPreco] = useState<string>('');
   const [categoria, setCategoria] = useState<string>('');
   const [idEdicao, setIdEdicao] = useState<number | undefined>(undefined);

   const carregar = () => {
      lerProduto(URL_DA_API).then((dados) => {
         setProdutos(dados);
         setCarregando(false);
      });
   };

   const limparFormulario = () => {
      setIdEdicao(undefined);
      setNome('');
      setPreco('');
      setCategoria('');
   };

   const salvar = async (id: number | undefined, produto: InterfaceProduto) => {
      await salvarProduto(id, produto, URL_DA_API);
      limparFormulario();
      carregar();
   };

   const excluir = async (id: number) => {
      const removido = await excluirProduto(id, URL_DA_API);
      if (removido) {
         if (idEdicao === id) {
            limparFormulario();
         }
         carregar();
      }
   };

   const iniciarEdicao = (produto: InterfaceProduto) => {
      setIdEdicao(produto.id_produto);
      setNome(produto.nome);
      setPreco(produto.preco.toString());
      setCategoria(produto.categoria);
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
               <Text style={estilos.titulo}>Painel CRUD Produtos (MySQL)</Text>
               <FormularioProduto
                  nome={nome} setNome={setNome}
                  preco={preco} setPreco={setPreco}
                  categoria={categoria} setCategoria={setCategoria}
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
                     data={produtos}
                     keyExtractor={(item) => item.id_produto?.toString() || Math.random().toString()}
                     renderItem={({ item }) => (
                        <ItemProduto
                           item={item}
                           iniciarEdicao={iniciarEdicao}
                           excluirProduto={(id) => {
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