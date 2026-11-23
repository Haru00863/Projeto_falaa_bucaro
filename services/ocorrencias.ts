import { Coordenadas } from "@/context/cidade-context";
import { bancoDeDados } from "@/firebase-config";
import { Ocorrencia } from "@/types/ocorrencia";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

/**
 * Busca no Firebase os últimos 50 reportes, do mais novo para o mais antigo.
 * O parâmetro `_centro` ainda não é usado (desafio extra: filtrar por proximidade).
 * O prefixo "_" indica ao lint/leitor que o parâmetro é ignorado de propósito.
 *
 * Observação: com `orderBy("criadoEm")`, documentos que não têm o campo
 * `criadoEm` não aparecem no resultado.
 */
export async function buscarOcorrencias(_centro: Coordenadas): Promise<Ocorrencia[]> {
  // `query` descreve a consulta (coleção + ordem + máximo de itens);
  // ela ainda não vai ao servidor, só `getDocs` executa de fato.
  const consulta = query(
    collection(bancoDeDados, "ocorrencias"),
    orderBy("criadoEm", "desc"),
    limit(50),
  );
  const resultado = await getDocs(consulta);

  // Converte cada documento do Firestore no tipo `Ocorrencia` usado pelas telas.
  return resultado.docs.map((documento) => {
    const dados = documento.data();
    return {
      id: documento.id, // o id fica fora de `data()`, vem do próprio documento
      titulo: dados.titulo,
      descricao: dados.descricao ?? undefined, // null gravado no banco vira undefined no app
      status: dados.status,
      latitude: dados.latitude,
      longitude: dados.longitude,
    };
  });
}
