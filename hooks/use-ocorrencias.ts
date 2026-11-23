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
 *
 * `idNotificante` é opcional: quando informado, traz só os reportes desse usuário.
 * `recarregar` e `atualizando` servem para o "puxar para atualizar" da lista.
 */
export function useOcorrencias(coordenadas: Coordenadas | null, idNotificante?: string) {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [carregando, setCarregando] = useState(false); // carga automática (ao abrir a tela)
  const [atualizando, setAtualizando] = useState(false); // carga manual (puxar para atualizar)

  useFocusEffect(
    // `useCallback` é obrigatório aqui: sem ele a função mudaria a cada render
    // e a busca seria refeita em loop. Se `idNotificante` mudar (ex.: o usuário
    // trocou de "Todos" para "Meus"), a função muda e a busca roda de novo.
    useCallback(() => {
      if (!coordenadas) {
        return;
      }
      let ativo = true; // evita atualizar o estado depois que a tela mudou
      setCarregando(true);
      buscarOcorrencias(coordenadas, idNotificante)
        .then((lista) => ativo && setOcorrencias(lista))
        .catch((erro) => console.warn("Falha ao buscar ocorrências", erro))
        .finally(() => ativo && setCarregando(false));
      // Função de limpeza: roda quando a tela perde o foco (ou os parâmetros mudam).
      return () => {
        ativo = false;
      };
    }, [coordenadas, idNotificante]),
  );

  // Busca de novo, sob demanda. Devolve uma Promise para o RefreshControl saber quando acabou.
  const recarregar = useCallback(async () => {
    if (!coordenadas) {
      return;
    }
    setAtualizando(true);
    try {
      setOcorrencias(await buscarOcorrencias(coordenadas, idNotificante));
    } catch (erro) {
      console.warn("Falha ao atualizar ocorrências", erro);
    } finally {
      setAtualizando(false);
    }
  }, [coordenadas, idNotificante]);

  return { ocorrencias, carregando, atualizando, recarregar };
}
