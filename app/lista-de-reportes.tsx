import { STATUS } from "@/constants/status";
import { useCidade } from "@/hooks/use-cidade";
import { useOcorrencias } from "@/hooks/use-ocorrencias";
import { cores } from "@/styles";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ListaDeReportes() {
  const { coordenadas } = useCidade();
  // Mesmo hook do mapa: a lista e os pinos usam a mesma fonte de dados (Firestore).
  const { ocorrencias, carregando } = useOcorrencias(coordenadas);

  return (
    <SafeAreaView style={estilos.container}>
      <Text style={estilos.titulo}>Reportes</Text>

      {carregando && <ActivityIndicator color={cores.verde} />}
      {!carregando && ocorrencias.length === 0 && (
        <Text style={estilos.vazio}>Nenhum reporte ainda.</Text>
      )}

      {/* FlatList renderiza só os itens visíveis, por isso é a escolha certa para listas que podem crescer. */}
      <FlatList
        data={ocorrencias}
        keyExtractor={(ocorrencia) => ocorrencia.id}
        renderItem={({ item }) => (
          <View style={estilos.cartao}>
            {/* A bolinha usa a mesma cor do pino no mapa (constants/status.ts). */}
            <View style={[estilos.bolinha, { backgroundColor: STATUS[item.status].cor }]} />
            <View style={estilos.textos}>
              <Text style={estilos.tituloDoReporte}>{item.titulo}</Text>
              {item.descricao && <Text style={estilos.descricao}>{item.descricao}</Text>}
              <Text style={estilos.situacao}>{STATUS[item.status].rotulo}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: cores.bgBrancoGelo },
  titulo: { fontSize: 22, fontWeight: "700", color: cores.preto, marginBottom: 12 },
  vazio: { textAlign: "center", color: cores.cinzaEscuro, marginTop: 24 },
  cartao: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: cores.branco,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  bolinha: { width: 10, height: 10, borderRadius: 5, marginTop: 5 },
  textos: { flex: 1 },
  tituloDoReporte: { fontSize: 16, fontWeight: "700", color: cores.preto },
  descricao: { fontSize: 14, color: cores.cinzaEscuro, marginTop: 2 },
  situacao: { fontSize: 12, color: cores.cinzaClaro, marginTop: 4 },
});
