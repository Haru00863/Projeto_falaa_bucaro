import { Text } from "react-native";

export default function Mapa({ logado = false }: { logado?: boolean }) {
  return (
    <>
      {/* tags Fragment para envolver o conteúdo do componente */}
      {logado ? (
        <Text
          style={{
            color: "white",
            fontSize: 30,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Sim to logado
        </Text>
      ) : (
        <Text
          style={{
            color: "yellow",
            fontSize: 30,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          NAo to logado
        </Text>
      )}
      <Text>Aqui vai o mapa</Text>
    </>
  );
}
