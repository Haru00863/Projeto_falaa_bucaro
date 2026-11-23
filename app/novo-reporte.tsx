import { useAuth } from "@/hooks/use-auth";
import { useCidade } from "@/hooks/use-cidade";
import { criarReporte } from "@/services/reportes";
import { cores } from "@/styles";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NovoReporte() {
  const roteador = useRouter();
  const { user: usuario } = useAuth(); // usuário logado no Firebase (ou null)
  const { coordenadas } = useCidade(); // posição do GPS (ou null se não liberada)

  // Estado dos campos do formulário e do envio.
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function enviar() {
    // Validações feitas antes de qualquer chamada ao banco: se alguma falhar,
    // mostramos o alerta e saímos da função sem gravar nada.
    if (!titulo.trim()) {
      Alert.alert("Título obrigatório", "Diga onde está o problema.");
      return;
    }
    if (!usuario) {
      Alert.alert("Login necessário", "Entre com a sua conta para reportar.");
      return;
    }
    if (!coordenadas) {
      Alert.alert("Localização indisponível", "Ative a localização do aparelho.");
      return;
    }

    setEnviando(true); // desabilita o botão para evitar envio duplicado
    try {
      await criarReporte({
        idNotificante: usuario.uid,
        titulo,
        descricao,
        latitude: coordenadas.latitude,
        longitude: coordenadas.longitude,
      });
      // Só volta para o mapa quando o usuário confirma o alerta.
      Alert.alert("Reporte enviado", "Obrigado por ajudar a cidade!", [
        { text: "OK", onPress: () => roteador.back() },
      ]);
    } catch (erro) {
      // O detalhe técnico vai para o console (útil para depurar, por exemplo
      // "Missing or insufficient permissions"); o usuário vê uma mensagem simples.
      console.warn("Falha ao gravar o reporte", erro);
      Alert.alert("Não foi possível enviar", "Tente de novo em instantes.");
    } finally {
      // `finally` roda com sucesso ou erro, então o botão nunca fica travado.
      setEnviando(false);
    }
  }

  return (
    <SafeAreaView style={estilos.container}>
      <Text style={estilos.titulo}>Novo reporte</Text>

      <TextInput
        style={estilos.campo}
        placeholder="Título (ex.: Buraco na Rua das Palmeiras)"
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        style={[estilos.campo, estilos.campoGrande]}
        placeholder="Descrição (opcional)"
        value={descricao}
        onChangeText={setDescricao}
        multiline
      />

      <TouchableOpacity style={estilos.botao} onPress={enviar} disabled={enviando}>
        <Text style={estilos.textoDoBotao}>{enviando ? "Enviando..." : "Enviar reporte"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => roteador.back()}>
        <Text style={estilos.cancelar}>Cancelar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 12, backgroundColor: cores.bgBrancoGelo },
  titulo: { fontSize: 22, fontWeight: "700", color: cores.preto },
  campo: { backgroundColor: cores.branco, borderRadius: 12, padding: 14, fontSize: 15 },
  campoGrande: { minHeight: 100, textAlignVertical: "top" },
  botao: { backgroundColor: cores.verde, borderRadius: 12, padding: 16, alignItems: "center" },
  textoDoBotao: { color: cores.branco, fontWeight: "700", fontSize: 16 },
  cancelar: { textAlign: "center", color: cores.cinzaEscuro, padding: 8 },
});
