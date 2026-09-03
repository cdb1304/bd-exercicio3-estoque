import { useEffect, useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, FlatList, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { InterfaceFilial } from '../interface/InterfaceFilial';
import FormularioFilial from './FormularioFilial';
import ItemFilial from './ItemFilial';
import { lerFilial } from '../api/lerFilial';
import { salvarFilial } from '../api/salvarFilial';
import { excluirFilial } from '../api/excluirFilial';

const URL: string = 'https://SUA-URL-PUBLICA.app.github.dev/';
const URL_DA_API: string = URL + 'filiais';

export default function PrincipalFilial() {
   const [filiais, setFiliais] = useState<InterfaceFilial[]>([]);
   const [carregando, setCarregando] = useState<boolean>(true);
   const [cnpj, setCnpj] = useState<string>('');
   const [nome, setNome] = useState<string>('');
   const [telefone, setTelefone] = useState<string>('');
   const [email, setEmail] = useState<string>('');
   const [cep, setCep] = useState<string>('');
   const [idEdicao, setIdEdicao] = useState<number | undefined>(undefined);

   const carregar = () => {
      lerFilial(URL_DA_API).then((dados) => {
         setFiliais(dados);
         setCarregando(false);
      });
   };

   const limparFormulario = () => {
      setIdEdicao(undefined);
      setCnpj('');
      setNome('');
      setTelefone('');
      setEmail('');
      setCep('');
   };

   const salvar = async (id: number | undefined, filial: InterfaceFilial) => {
      await salvarFilial(id, filial, URL_DA_API);
      limparFormulario();
      carregar();
   };

   const excluir = async (id: number) => {
      const removido = await excluirFilial(id, URL_DA_API);
      if (removido) {
         if (idEdicao === id) {
            limparFormulario();
         }
         carregar();
      }
   };

   const iniciarEdicao = (filial: InterfaceFilial) => {
      setIdEdicao(filial.id_filial);
      setCnpj(filial.cnpj);
      setNome(filial.nome);
      setTelefone(filial.telefone);
      setEmail(filial.email);
      setCep(filial.cep);
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
               <Text style={estilos.titulo}>Painel CRUD Filiais (MySQL)</Text>
               <FormularioFilial
                  cnpj={cnpj} setCnpj={setCnpj}
                  nome={nome} setNome={setNome}
                  telefone={telefone} setTelefone={setTelefone}
                  email={email} setEmail={setEmail}
                  cep={cep} setCep={setCep}
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
                     data={filiais}
                     keyExtractor={(item) => item.id_filial?.toString() || Math.random().toString()}
                     renderItem={({ item }) => (
                        <ItemFilial
                           item={item}
                           iniciarEdicao={iniciarEdicao}
                           excluirFilial={(id) => {
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