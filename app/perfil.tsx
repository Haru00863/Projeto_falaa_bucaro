import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const cores = { verde: "#108245", preto: "#161a20", cinzaClaro: "#8a93a1", bgBrancoGelo: "#f6f8fa" };

export default function Perfil() {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: cores.bgBrancoGelo, justifyContent: "center", alignItems: "center", paddingHorizontal: 24 }}>
      <View style={{ width: 64, height: 64, borderRadius: 20, backgroundColor: cores.verde, justifyContent: "center", alignItems: "center", marginBottom: 16 }}>
        <Text style={{ color: "#fff", fontSize: 24 }}>👤</Text>
      </View>
      <Text style={{ color: cores.preto, fontSize: 22, fontWeight: "800", marginBottom: 8, textAlign: "center" }}>Perfil</Text>
      <Text style={{ color: cores.cinzaClaro, fontSize: 15, textAlign: "center", marginBottom: 20 }}>Tela em construção.</Text>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={{ color: cores.verde, fontSize: 14, fontWeight: "700" }}>{"< Voltar para o mapa"}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
