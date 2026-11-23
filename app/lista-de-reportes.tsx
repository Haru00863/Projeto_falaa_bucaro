import { STATUS } from "@/constants/status";
import { TIPOS } from "@/constants/tipos";
import { useAuth } from "@/hooks/use-auth";
import { useCidade } from "@/hooks/use-cidade";
import { useOcorrencias } from "@/hooks/use-ocorrencias";
import { cores } from "@/styles";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Formata a data no padrão brasileiro: DD/MM/AAAA HH:mm.
// Montamos o texto à mão (em vez de toLocaleString) para o resultado ser o mesmo
// em qualquer aparelho e não depender do suporte a idiomas do motor JavaScript.
function formatarData(data: Date): string {
  const doisDigitos = (n: number) => String(n).padStart(2, "0");
  const dia = `${doisDigitos(data.getDate())}/${doisDigitos(data.getMonth() + 1)}/${data.getFullYear()}`;
  const hora = `${doisDigitos(data.getHours())}:${doisDigitos(data.getMinutes())}`;
  return `${dia} ${hora}`;
}

export default function ListaDeReportes() {
  const { coordenadas } = useCidade();
  const { user: usuario } = useAuth();
  // false = todos os reportes; true = só os do usuário logado.
  const [somenteMeus, setSomenteMeus] = useState(false);

  // Mesmo hook do mapa: a lista e os pinos usam a mesma fonte de dados (Firestore).
  // Passar o uid faz o hook buscar só os reportes desse usuário (where no Firestore).
  const { ocorrencias, carregando, atualizando, recarregar } = useOcorrencias(
    coordenadas,
    somenteMeus ? usuario?.uid : undefined,
  );

  return (
    <SafeAreaView style={estilos.container}>
      <Text style={estilos.titulo}>Reportes</Text>

      {/* Alternador "Todos | Meus": só aparece para quem está logado, pois precisa do uid. */}
      {usuario && (
        <View style={estilos.alternador}>
          <TouchableOpacity
            style={[estilos.opcao, !somenteMeus && estilos.opcaoAtiva]}
            onPress={() => setSomenteMeus(false)}
            accessibilityRole="button"
            accessibilityState={{ selected: !somenteMeus }}
          >
            <Text style={[estilos.textoDaOpcao, !somenteMeus && estilos.textoDaOpcaoAtiva]}>
              Todos
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[estilos.opcao, somenteMeus && estilos.opcaoAtiva]}
            onPress={() => setSomenteMeus(true)}
            accessibilityRole="button"
            accessibilityState={{ selected: somenteMeus }}
          >
            <Text style={[estilos.textoDaOpcao, somenteMeus && estilos.textoDaOpcaoAtiva]}>
              Meus
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {carregando && <ActivityIndicator color={cores.verde} />}
      {!carregando && ocorrencias.length === 0 && (
        <Text style={estilos.vazio}>
          {somenteMeus ? "Você ainda não fez nenhum reporte." : "Nenhum reporte ainda."}
        </Text>
      )}

      {/* FlatList renderiza só os itens visíveis, por isso é a escolha certa para listas que podem crescer. */}
      <FlatList
        data={ocorrencias}
        keyExtractor={(ocorrencia) => ocorrencia.id}
        // Puxar a lista para baixo chama `recarregar`; `refreshing` controla o círculo de carregamento.
        refreshControl={
          <RefreshControl
            refreshing={atualizando}
            onRefresh={recarregar}
            colors={[cores.verde]} // cor do círculo no Android
            tintColor={cores.verde} // cor do círculo no iOS
          />
        }
        renderItem={({ item }) => (
          <View style={estilos.cartao}>
            {/* A bolinha usa a mesma cor do pino no mapa (constants/status.ts). */}
            <View style={[estilos.bolinha, { backgroundColor: STATUS[item.status].cor }]} />
            <View style={estilos.textos}>
              <Text style={estilos.tituloDoReporte}>{item.titulo}</Text>
              {item.descricao && <Text style={estilos.descricao}>{item.descricao}</Text>}
              {item.endereco && <Text style={estilos.endereco}>{item.endereco}</Text>}
              {/* Situação e, quando existir, o tipo. Reportes antigos não têm tipo. */}
              <Text style={estilos.situacao}>
                {STATUS[item.status].rotulo}
                {item.tipo ? ` · ${TIPOS[item.tipo]?.rotulo ?? item.tipo}` : ""}
              </Text>
              {item.criadoEm && <Text style={estilos.data}>{formatarData(item.criadoEm)}</Text>}
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
  alternador: {
    flexDirection: "row",
    backgroundColor: "#e5e7eb",
    borderRadius: 12,
    padding: 4,
    marginBottom: 12,
  },
  opcao: { flex: 1, paddingVertical: 8, borderRadius: 9, alignItems: "center" },
  opcaoAtiva: { backgroundColor: cores.branco },
  textoDaOpcao: { fontSize: 14, color: cores.cinzaEscuro },
  textoDaOpcaoAtiva: { color: cores.preto, fontWeight: "700" },
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
  endereco: { fontSize: 13, color: cores.cinzaEscuro, marginTop: 2 },
  situacao: { fontSize: 12, color: cores.cinzaClaro, marginTop: 4 },
  data: { fontSize: 12, color: cores.cinzaClaro, marginTop: 2 },
});
