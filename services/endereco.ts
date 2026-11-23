import { Coordenadas } from "@/context/cidade-context";
import * as Location from "expo-location";

// Tempo máximo de espera pela geocodificação reversa. Sem esse limite, uma
// resposta lenta do serviço de endereços travaria o envio do reporte.
const TEMPO_MAXIMO_MS = 5000;

/**
 * Converte coordenadas em um endereço legível, ex.: "Rua das Palmeiras, 120 - Centro - Cuiabá".
 *
 * `Location.reverseGeocodeAsync` faz a "geocodificação reversa" (coordenadas -> endereço).
 * O endereço é só um complemento do reporte, então esta função nunca lança erro:
 * se falhar, demorar demais ou não achar nada, devolve `null` e o reporte é
 * gravado normalmente, só sem o campo `endereco`.
 */
export async function buscarEndereco(coordenadas: Coordenadas): Promise<string | null> {
  let temporizador: ReturnType<typeof setTimeout> | undefined;
  try {
    // `Promise.race` devolve o que terminar primeiro: o endereço ou o erro de tempo esgotado.
    const limite = new Promise<never>((_, rejeitar) => {
      temporizador = setTimeout(() => rejeitar(new Error("tempo esgotado")), TEMPO_MAXIMO_MS);
    });
    const [lugar] = await Promise.race([Location.reverseGeocodeAsync(coordenadas), limite]);
    if (!lugar) {
      return null;
    }

    // Monta "rua, número - bairro - cidade", pulando as partes que vierem vazias.
    const rua = [lugar.street, lugar.streetNumber].filter(Boolean).join(", ");
    const partes = [rua, lugar.district, lugar.city ?? lugar.subregion].filter(Boolean);
    return partes.length > 0 ? partes.join(" - ") : null;
  } catch (erro) {
    console.warn("Não foi possível descobrir o endereço", erro);
    return null;
  } finally {
    clearTimeout(temporizador); // evita deixar o temporizador pendente quando o endereço chega antes
  }
}
