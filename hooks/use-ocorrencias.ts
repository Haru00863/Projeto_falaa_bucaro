import { Coordenadas } from "@/context/cidade-context";
import { buscarOcorrencias } from "@/services/ocorrencias";
import { Ocorrencia } from "@/types/ocorrencia";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

/**
 * Carrega as ocorrências. A busca roda toda vez que a tela volta a ficar em foco,
 * assim um reporte recém-criado já aparece ao voltar da tela "Novo reporte".
 *
 * Por que `useFocusEffect` e não `useEffect`? Na navegação em pilha a tela do
 * mapa continua montada por baixo de "Novo reporte"; o `useEffect` não roda de
 * novo ao voltar, enquanto o `useFocusEffect` roda a cada vez que a tela ganha foco.
 */
export function useOcorrencias(coordenadas: Coordenadas | null) {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [carregando, setCarregando] = useState(false);

  useFocusEffect(
    // `useCallback` é obrigatório aqui: sem ele a função mudaria a cada render
    // e a busca seria refeita em loop.
    useCallback(() => {
      if (!coordenadas) {
        return;
      }
      let ativo = true; // evita atualizar o estado depois que a tela mudou
      setCarregando(true);
      buscarOcorrencias(coordenadas)
        .then((lista) => ativo && setOcorrencias(lista))
        .finally(() => ativo && setCarregando(false));
      // Função de limpeza: roda quando a tela perde o foco (ou as coordenadas mudam).
      return () => {
        ativo = false;
      };
    }, [coordenadas]),
  );

  return { ocorrencias, carregando };
}
