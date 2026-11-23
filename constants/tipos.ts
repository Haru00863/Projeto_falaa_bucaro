import { TipoOcorrencia } from "@/types/ocorrencia";

// Texto mostrado na tela para cada tipo de problema (mesmo padrão de constants/status.ts).
export const TIPOS: Record<TipoOcorrencia, { rotulo: string }> = {
  buraco: { rotulo: "Buraco" },
  calcada: { rotulo: "Calçada" },
  iluminacao: { rotulo: "Iluminação" },
  outro: { rotulo: "Outro" },
};

// Lista na ordem em que os botões aparecem no formulário.
export const LISTA_DE_TIPOS = Object.keys(TIPOS) as TipoOcorrencia[];
