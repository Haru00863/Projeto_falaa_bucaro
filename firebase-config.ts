import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";
// @ts-ignore - tipos do firebase/auth não expõem getReactNativePersistence p/ RN, mas existe em runtime no build nativo (iOS/Android)
import { getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore, initializeFirestore} from "firebase/firestore";
import { Platform } from "react-native";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Na web o bundle do firebase/auth não traz getReactNativePersistence (é só
// pra iOS/Android), então lá usamos getAuth normal — o Firebase já persiste
// a sessão no localStorage do navegador por padrão.
export const auth =
  Platform.OS === "web"
    ? getAuth(app)
    : initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
      });


// Banco de dados (Firestore): é por ele que gravamos e lemos os reportes.
// No React Native a conexão padrão (WebChannel) às vezes não conecta e as
// chamadas ficam esperando para sempre. O long polling usa requisições HTTP
// comuns e evita esse problema.
function criarBancoDeDados() {
  try {
    return initializeFirestore(app, { experimentalForceLongPolling: true });
  } catch {
    // initializeFirestore só pode rodar uma vez por app. Quando o Fast Refresh
    // recarrega este arquivo, ele já foi chamado, então reaproveitamos o banco.
    return getFirestore(app);
  }
}

export const bancoDeDados = criarBancoDeDados();

