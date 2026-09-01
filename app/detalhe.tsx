import { useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const cores = { verde: "#108245", preto: "#161a20", cinzaClaro: "#8a93a1", bgBrancoGelo: "#f6f8fa", cinzaBadge: "#e3e8ee", cinzaBadgeTexto: "#5b6472" };

export default function DetalheReport() {
  const router = useRouter();
  const { logado } = useLocalSearchParams<{ logado?: string }>();
  const estaLogado = logado === "true";

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.badge, { backgroundColor: estaLogado ? cores.verde : cores.cinzaBadge }]}>
        <Text style={[styles.badgeTexto, { color: estaLogado ? "#fff" : cores.cinzaBadgeTexto }]}>
          {estaLogado ? "🟢 Logado" : "⚪ Sem login"}
        </Text>
      </View>
      <View style={styles.conteudo}>
        <View style={styles.icone}><Text style={{ color: "#fff", fontSize: 24 }}>🕳️</Text></View>
        <Text style={styles.titulo}>Detalhe do report</Text>
        <Text style={styles.subtitulo}>Tela em construção.</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.voltar}>{"< Voltar para o mapa"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.bgBrancoGelo },
  badge: { position: "absolute", top: 16, right: 16, borderRadius: 999, paddingVertical: 4, paddingHorizontal: 10, zIndex: 10 },
  badgeTexto: { fontSize: 11, fontWeight: "700" },
  conteudo: { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 24 },
  icone: { width: 64, height: 64, borderRadius: 20, backgroundColor: cores.verde, justifyContent: "center", alignItems: "center", marginBottom: 16 },
  titulo: { color: cores.preto, fontSize: 22, fontWeight: "800", marginBottom: 8, textAlign: "center" },
  subtitulo: { color: cores.cinzaClaro, fontSize: 15, textAlign: "center", marginBottom: 20 },
  voltar: { color: cores.verde, fontSize: 14, fontWeight: "700" },
});
