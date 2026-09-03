import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { PropriedadesFormularioFilial } from '../interface/PropriedadesFormularioFilial';
import { InterfaceFilial } from '../interface/InterfaceFilial';

export default function FormularioFilial(props: PropriedadesFormularioFilial) {
   return (
      <View style={[estilos.formulario, props.idEdicao !== undefined && estilos.formularioEdicao]}>
         <Text style={estilos.formularioTitulo}>
            {props.idEdicao !== undefined ? 'Editando Registro' : 'Nova Filial'}
         </Text>

         <TextInput
            style={estilos.entradaTexto}
            placeholder="Nome"
            value={props.nome}
            onChangeText={props.setNome}
         />
         <TextInput
            style={estilos.entradaTexto}
            placeholder="CNPJ"
            keyboardType="numeric"
            value={props.cnpj}
            onChangeText={props.setCnpj}
         />

         <View style={estilos.fileiraCampos}>
            <TextInput
               style={[estilos.entradaTexto, { flex: 1, marginRight: 8 }]}
               placeholder="Telefone"
               keyboardType="phone-pad"
               value={props.telefone}
               onChangeText={props.setTelefone}
            />
            <TextInput
               style={[estilos.entradaTexto, { flex: 1 }]}
               placeholder="CEP"
               keyboardType="numeric"
               value={props.cep}
               onChangeText={props.setCep}
            />
         </View>

         <TextInput
            style={estilos.entradaTexto}
            placeholder="E-mail"
            keyboardType="email-address"
            value={props.email}
            onChangeText={props.setEmail}
         />

         <View style={estilos.fileiraAcoes}>
            <TouchableOpacity
               style={[estilos.botao, props.idEdicao !== undefined
                  ? estilos.botaoLaranja
                  : estilos.botaoVerde]}
               onPress={() => {
                  const filial: InterfaceFilial = {
                     id_filial: props.idEdicao,
                     cnpj: props.cnpj,
                     nome: props.nome,
                     telefone: props.telefone,
                     email: props.email,
                     cep: props.cep
                  };
                  props.salvarDados(props.idEdicao, filial);
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