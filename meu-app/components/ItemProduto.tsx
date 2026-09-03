import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { PropriedadesProduto } from '../interface/PropriedadesProduto';

export default function ItemProduto(props: PropriedadesProduto) {
   return (
      <TouchableOpacity
         style={estilos.cartao}
         onPress={() => props.iniciarEdicao(props.item)}
         activeOpacity={0.7}
      >
         <View style={estilos.cabecalhoCartao}>
            <View style={estilos.detalhesProduto}>
               <Text style={estilos.produtoNome}>{props.item.nome}</Text>
               <Text style={estilos.produtoCategoria}>{props.item.categoria}</Text>
            </View>
            <TouchableOpacity
               style={estilos.botaoDeletar}
               onPress={() => props.excluirProduto(props.item.id_produto)}
            >
               <Text style={estilos.botaoDeletarTexto}>Excluir</Text>
            </TouchableOpacity>
         </View>

         <View style={estilos.fileiraInfo}>
            <Text style={estilos.produtoPreco}>R$ {Number(props.item.preco).toFixed(2)}</Text>
         </View>
         <Text style={estilos.dicaEdicao}>Toque para editar</Text>
      </TouchableOpacity>
   );
}

const estilos = StyleSheet.create({
   cartao: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 10, elevation: 1 },
   cabecalhoCartao: { flexDirection: 'row', alignItems: 'flex-start' },
   detalhesProduto: { flex: 1, minWidth: 0, marginRight: 8 },
   produtoNome: { fontSize: 16, fontWeight: 'bold', flexShrink: 1 },
   produtoCategoria: { fontSize: 13, color: '#666' },
   botaoDeletar: { backgroundColor: '#d32f2f', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 4 },
   botaoDeletarTexto: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
   fileiraInfo: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 6 },
   produtoPreco: { fontSize: 14, fontWeight: 'bold', color: '#2e7d32' },
   dicaEdicao: { fontSize: 10, color: '#999', textAlign: 'right', marginTop: 4, fontStyle: 'italic' }
});