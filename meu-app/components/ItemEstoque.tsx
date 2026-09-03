import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { PropriedadesEstoque } from '../interface/PropriedadesEstoque';

export default function ItemEstoque(props: PropriedadesEstoque) {
   return (
      <TouchableOpacity
         style={estilos.cartao}
         onPress={() => props.iniciarEdicao(props.item)}
         activeOpacity={0.7}
      >
         <View style={estilos.cabecalhoCartao}>
            <View style={estilos.detalhesEstoque}>
               <Text style={estilos.estoqueTitulo}>Filial #{props.item.id_filial} · Produto #{props.item.id_produto}</Text>
            </View>
            <TouchableOpacity
               style={estilos.botaoDeletar}
               onPress={() => props.excluirEstoque(props.item.id_estoque)}
            >
               <Text style={estilos.botaoDeletarTexto}>Excluir</Text>
            </TouchableOpacity>
         </View>

         <View style={estilos.fileiraInfo}>
            <Text style={estilos.estoqueQuantidade}>Quantidade: {props.item.quantidade}</Text>
         </View>
         <Text style={estilos.dicaEdicao}>Toque para editar</Text>
      </TouchableOpacity>
   );
}

const estilos = StyleSheet.create({
   cartao: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 10, elevation: 1 },
   cabecalhoCartao: { flexDirection: 'row', alignItems: 'flex-start' },
   detalhesEstoque: { flex: 1, minWidth: 0, marginRight: 8 },
   estoqueTitulo: { fontSize: 16, fontWeight: 'bold', flexShrink: 1 },
   botaoDeletar: { backgroundColor: '#d32f2f', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 4 },
   botaoDeletarTexto: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
   fileiraInfo: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 6 },
   estoqueQuantidade: { fontSize: 14, fontWeight: 'bold', color: '#2e7d32' },
   dicaEdicao: { fontSize: 10, color: '#999', textAlign: 'right', marginTop: 4, fontStyle: 'italic' }
});