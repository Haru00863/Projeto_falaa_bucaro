import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  //anchor: "(tabs)",
  initialRouteName: "index",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
        <Stack.Screen name="mapa" options={{ title: "Mapa dos buracos" }} />
        <Stack.Screen
          name="criacao_reporte"
          options={{ title: "Reportar buraco" }}
        />
        <Stack.Screen
          name="detalhe"
          options={{ title: "Detalhe do report" }}
        />
        <Stack.Screen name="perfil" options={{ title: "Perfil" }} />
        <Stack.Screen
          name="prefeitura"
          options={{ title: "Painel da Prefeitura" }}
        />
      </Stack>
    </ThemeProvider>
  );
}
