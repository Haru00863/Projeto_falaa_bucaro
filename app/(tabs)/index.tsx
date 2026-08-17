import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Meu querido App</Text>
      <Text style={styles.subtitulo}>Meu App troca de cor</Text>
      <Text style={styles.corpo}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since 1966, when designers at Letraset and James Mosley, the librarian
        at St Bride Printing Library in London, took a 1914
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: "black",
          width: 300,
          height: "auto",
          padding: 20,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 90,
        }}
      >
        <Text style={{ color: "white", fontWeight: 800 }}>
          Clique para trocar de cor
        </Text>
      </TouchableOpacity>
      <Text style={styles.rodape}>
        Todos os direitos reservador - 2026 Meu querido App
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#820AD1",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  titulo: {
    color: "white", //Troca a cor da fonte
    fontSize: 40, //Troca o tamanho da fomte
    fontWeight: 800 /*Coloca o efeito para a fonte ficar mais forte ou mais fraca*/,
  },
  subtitulo: {
    color: "white", //Troca a cor da fonte
    fontSize: 25, //Troca o tamanho da fomte
    fontWeight: 800 /*Coloca o efeito para a fonte ficar mais forte ou mais fraca*/,
  },
  corpo: {
    color: "white", //Troca a cor da fonte
    fontSize: 20, //Troca o tamanho da fomte
    fontWeight: 600 /*Coloca o efeito para a fonte ficar mais forte ou mais fraca*/,
    marginVertical: 20, //Coloca uma margem em volta do texto
  },
  rodape: {
    color: "white", //Troca a cor da fonte
    justifyContent: "center", //Centraliza o texto
    fontSize: 15, //Troca o tamanho da fonte
    fontWeight: 400 /*Coloca o efeito para a fonte ficar mais forte ou mais fraca*/,
    alignItems: "center", //Centraliza o texto
    marginTop: 15,
  },
});
