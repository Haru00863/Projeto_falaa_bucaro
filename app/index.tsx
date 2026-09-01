import GoogleLogo from "@/components/google-logo";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Link } from "expo-router";

const cores = {
  verde: "#108245",
  verdeEscuro: "#0c6b38",
  preto: "#161a20",
  cinzaEscuro: "#5b6472",
  cinzaClaro: "#8a93a1",
  bgBrancoGelo: "#f6f8fa",
  branco: "#ffffff",
};
export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.badgeSemLogin}>
        <Text style={styles.badgeTexto}>⚪ Sem login</Text>
      </View>
      <View style={styles.logo}>
        <Text style={styles.logoText}>BC</Text>
      </View>
      <Text style={styles.titulo}>Falaa buraco!</Text>
      <Text style={styles.subtitulo}>
        Reporte, acompanhe e confirme a correção de buracos na sua cidade.
      </Text>

      <Link
        href={{
          pathname: "/mapa",
          params: { logado: "true" },
        }}
        asChild
      >
        <TouchableOpacity activeOpacity={0.8} style={styles.botao}>
          <View style={styles.googleIconCircle}>
            <GoogleLogo size={20} />
          </View>
          <Text style={styles.textoBotao}>Entrar com o Google</Text>
        </TouchableOpacity>
      </Link>
      <Text style={styles.rodape}>
        Ao continuar, você concorda com os Termos e a Política de Privacidade
        (LGPD).
      </Text>
      <Link
        href={{
          pathname: "/mapa",
          params: { logado: "false" },
        }}
        asChild
      >
        <TouchableOpacity activeOpacity={0.8}>
          <Text style={styles.mapaSemLogin}>Ver mapa sem login {">"}</Text>
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  badgeSemLogin: { position: "absolute", top: 16, right: 16, backgroundColor: "#e3e8ee", borderRadius: 999, paddingVertical: 4, paddingHorizontal: 10 },
  badgeTexto: { fontSize: 11, fontWeight: "700", color: "#5b6472" },
  container: { flex: 1, backgroundColor: cores.bgBrancoGelo, justifyContent: "center", alignItems: "center", paddingHorizontal: 20 },
  logo: { width: 100, height: 100, borderRadius: 30, backgroundColor: cores.verde, justifyContent: "center", alignItems: "center" },
  logoText: { color: "white", fontSize: 40, fontWeight: 900 },
  titulo: { color: cores.preto, fontSize: 40, marginVertical: 20, fontWeight: 800 },
  subtitulo: { color: cores.cinzaClaro, fontSize: 18, marginBottom: 20, textAlign: "center", fontWeight: 800 },
  rodape: { color: cores.cinzaClaro, justifyContent: "center", fontSize: 15, fontWeight: 400, alignItems: "center", textAlign: "center", marginTop: 15 },
  botao: { backgroundColor: cores.verde, width: 300, height: "auto", padding: 20, alignItems: "center", justifyContent: "center", borderRadius: 15, flexDirection: "row" },
  textoBotao: { marginStart: 10, color: cores.branco, fontSize: 20, fontWeight: 800 },
  mapaSemLogin: { fontSize: 16, fontWeight: "700", color: cores.verde, marginTop: 10 },
  googleIconText: { color: cores.branco, fontSize: 20, fontWeight: 800, marginBottom: 10, marginRight: 10 },
  googleIconCircle: { width: 32, height: 32, borderRadius: 16, backgroundColor: cores.branco, alignItems: "center", justifyContent: "center" },
});
