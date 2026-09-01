import { Link, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const cores = {
  verde: "#108245",
  verdeEscuro: "#0c6b38",
  preto: "#161a20",
  cinzaEscuro: "#5b6472",
  cinzaClaro: "#8a93a1",
  bgBrancoGelo: "#f6f8fa",
  branco: "#ffffff",
  amber: "#9c6209",
  amberFundo: "#faf1de",
};

export default function Mapa() {
  const { logado } = useLocalSearchParams<{ logado?: string }>();
  const estaLogado = logado === "true";

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Mapa dos buracos</Text>
        <Text style={styles.subtitulo}>Cuiabá, MT</Text>
      </View>

      <View style={styles.navPills}>
        <Link href={{ pathname: "/perfil", params: { logado: estaLogado ? "true" : "false" } }} asChild>
          <TouchableOpacity style={styles.navPill}>
            <Text style={styles.navPillTexto}>Perfil</Text>
          </TouchableOpacity>
        </Link>
        <Link href={{ pathname: "/prefeitura", params: { logado: estaLogado ? "true" : "false" } }} asChild>
          <TouchableOpacity style={styles.navPill}>
            <Text style={styles.navPillTexto}>Prefeitura</Text>
          </TouchableOpacity>
        </Link>
        <Link href={{ pathname: "/detalhe", params: { logado: estaLogado ? "true" : "false" } }} asChild>
          <TouchableOpacity style={styles.navPill}>
            <Text style={styles.navPillTexto}>Detalhe do report</Text>
          </TouchableOpacity>
        </Link>
      </View>

      {!estaLogado && (
        <View style={styles.aviso}>
          <Text style={styles.avisoTexto}>
            Você está vendo o mapa sem login. Sem login não é possível
            reportar um novo buraco nem confirmar correções.
          </Text>
          <Link href="/" asChild>
            <TouchableOpacity activeOpacity={0.8}>
              <Text style={styles.avisoBotao}>Fazer login {">"}</Text>
            </TouchableOpacity>
          </Link>
        </View>
      )}

      <View style={styles.mapaPlaceholder}>
        <Text style={styles.mapaPlaceholderTexto}>
          [ Aqui vai o mapa com os buracos reportados ]
        </Text>
      </View>

      {estaLogado && (
        <Link href={{ pathname: "/criacao_reporte", params: { logado: estaLogado ? "true" : "false" } }} asChild>
          <TouchableOpacity activeOpacity={0.85} style={styles.botaoFlutuante}>
            <Text style={styles.botaoFlutuanteTexto}>+ Reportar buraco</Text>
          </TouchableOpacity>
        </Link>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.bgBrancoGelo },
  header: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 4 },
  titulo: { color: cores.preto, fontSize: 22, fontWeight: "800" },
  subtitulo: { color: cores.cinzaClaro, fontSize: 14, marginTop: 2 },
  navPills: { flexDirection: "row", flexWrap: "wrap", gap: 8, paddingHorizontal: 20, marginTop: 12 },
  navPill: { borderWidth: 1, borderColor: "#d7dce2", backgroundColor: cores.branco, borderRadius: 999, paddingVertical: 6, paddingHorizontal: 12 },
  navPillTexto: { color: cores.cinzaEscuro, fontSize: 12, fontWeight: "600" },
  aviso: { backgroundColor: cores.amberFundo, marginHorizontal: 20, marginTop: 12, padding: 14, borderRadius: 12 },
  avisoTexto: { color: cores.amber, fontSize: 13, lineHeight: 18 },
  avisoBotao: { color: cores.verde, fontSize: 13, fontWeight: "700", marginTop: 8 },
  mapaPlaceholder: { flex: 1, marginHorizontal: 20, marginTop: 16, borderRadius: 16, backgroundColor: "#e3e8ee", justifyContent: "center", alignItems: "center", padding: 20 },
  mapaPlaceholderTexto: { color: cores.cinzaEscuro, fontSize: 15, textAlign: "center" },
  botaoFlutuante: { position: "absolute", bottom: 28, alignSelf: "center", backgroundColor: cores.verde, paddingVertical: 14, paddingHorizontal: 24, borderRadius: 30, shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 4 },
  botaoFlutuanteTexto: { color: cores.branco, fontSize: 15, fontWeight: "700" },
});
