import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { PropriedadesFormularioEstoque } from '../interface/PropriedadesFormularioEstoque';
import { InterfaceEstoque } from '../interface/InterfaceEstoque';

export default function FormularioEstoque(props: PropriedadesFormularioEstoque) {
   return (
      <View style={[estilos.formulario, props.idEdicao !== undefined && estilos.formularioEdicao]}>
         <Text style={estilos.formularioTitulo}>
            {props.idEdicao !== undefined ? 'Editando Registro' : 'Novo Registro de Estoque'}
         </Text>

         <View style={estilos.fileiraCampos}>
            <TextInput
               style={[estilos.entradaTexto, { flex: 1, marginRight: 8 }]}
               placeholder="ID da Filial"
               keyboardType="numeric"
               value={props.idFilial}
               onChangeText={props.setIdFilial}
            />
            <TextInput
               style={[estilos.entradaTexto, { flex: 1, marginRight: 8 }]}
               placeholder="ID do Produto"
               keyboardType="numeric"
               value={props.idProduto}
               onChangeText={props.setIdProduto}
            />
            <TextInput
               style={[estilos.entradaTexto, { flex: 1 }]}
               placeholder="Quantidade"
               keyboardType="numeric"
               value={props.quantidade}
               onChangeText={props.setQuantidade}
            />
         </View>

         <View style={estilos.fileiraAcoes}>
            <TouchableOpacity
               style={[estilos.botao, props.idEdicao !== undefined
                  ? estilos.botaoLaranja
                  : estilos.botaoVerde]}
               onPress={() => {
                  const estoque: InterfaceEstoque = {
                     id_estoque: props.idEdicao,
                     id_filial: parseInt(props.idFilial, 10) || 0,
                     id_produto: parseInt(props.idProduto, 10) || 0,
                     quantidade: parseInt(props.quantidade, 10) || 0
                  };
                  props.salvarDados(props.idEdicao, estoque);
               }}
            >
               <Text style={estilos.botaoTexto}>
                  {props.idEdicao !== undefined ? 'Atualizar no MySQL' : 'Salvar no MySQL'}
               </Text>
            </TouchableOpacity>

            {props.idEdicao !== undefined && (
               <TouchableOpacity style={estilos.botaoCancelar} onPress={props.limparFormulario}>
                  <Text style={estilos.cancelarTexto}>Cancelar</Text>
               </TouchableOpacity>
            )}
         </View>
      </View>
   );
}

const estilos = StyleSheet.create({
   formulario: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 15, elevation: 2, borderWidth: 1, borderColor: '#eee' },
   formularioEdicao: { borderColor: '#ed6c02', backgroundColor: '#fffbf7' },
   formularioTitulo: { fontSize: 14, fontWeight: 'bold', color: '#555', marginBottom: 8 },
   entradaTexto: { backgroundColor: '#f9f9f9', borderWidth: 1, borderColor: '#ddd', padding: 8, borderRadius: 5, marginBottom: 8 },
   fileiraCampos: { flexDirection: 'row' },
   fileiraAcoes: { flexDirection: 'row', marginTop: 4 },
   botao: { flex: 2, padding: 12, borderRadius: 5, alignItems: 'center' },
   botaoVerde: { backgroundColor: '#2e7d32' },
   botaoLaranja: { backgroundColor: '#ed6c02' },
   botaoCancelar: { flex: 1, backgroundColor: '#777', padding: 12, borderRadius: 5, alignItems: 'center', marginLeft: 8 },
   botaoTexto: { color: '#fff', fontWeight: 'bold' },
   cancelarTexto: { color: '#fff', fontWeight: 'bold' }
});