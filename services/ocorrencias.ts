import { Coordenadas } from "@/context/cidade-context";
import { bancoDeDados } from "@/firebase-config";
import { Ocorrencia } from "@/types/ocorrencia";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";

/**
 * Busca reportes no Firebase.
 *
 * - Sem `idNotificante`: os últimos 50 reportes de todos, do mais novo para o mais antigo.
 * - Com `idNotificante`: só os reportes desse usuário ("meus reportes").
 *
 * O parâmetro `_centro` ainda não é usado (filtrar por proximidade ficou para outro desafio).
 * O prefixo "_" indica ao lint/leitor que o parâmetro é ignorado de propósito.
 *
 * Observação: com `orderBy("criadoEm")`, documentos que não têm o campo
 * `criadoEm` não aparecem no resultado.
 */
export async function buscarOcorrencias(
  _centro: Coordenadas,
  idNotificante?: string,
): Promise<Ocorrencia[]> {
  const colecao = collection(bancoDeDados, "ocorrencias");

  // `where` junto com `orderBy` em campos diferentes exigiria criar um índice
  // composto no console do Firebase. Para evitar isso, no caso "meus reportes"
  // filtramos no servidor (where) e ordenamos aqui no app, logo abaixo.
  // Query descreve a consulta; só `getDocs` executa de fato.
  const consulta = idNotificante
    ? query(colecao, where("idNotificante", "==", idNotificante), limit(100))
    : query(colecao, orderBy("criadoEm", "desc"), limit(50));
  const resultado = await getDocs(consulta);

  // Converte cada documento do Firestore no tipo `Ocorrencia` usado pelas telas.
  const lista: Ocorrencia[] = resultado.docs.map((documento) => {
    const dados = documento.data();
    return {
      id: documento.id, // o id fica fora de `data()`, vem do próprio documento
      titulo: dados.titulo,
      descricao: dados.descricao ?? undefined, // null gravado no banco vira undefined no app
      status: dados.status,
      latitude: dados.latitude,
      longitude: dados.longitude,
      tipo: dados.tipo ?? undefined, // reportes antigos não têm tipo
      endereco: dados.endereco ?? undefined, // nem endereço
      // `criadoEm` chega do Firestore como Timestamp; `.toDate()` converte para Date.
      // O `?.` evita erro se o campo estiver ausente ou ainda vazio.
      criadoEm: dados.criadoEm?.toDate(),
      idNotificante: dados.idNotificante,
    };
  });

  // Ordenação feita no app (mais novo primeiro) para o caso com `where`.
  // No caso sem `where` a lista já veio ordenada e esta linha não muda nada.
  lista.sort((a, b) => (b.criadoEm?.getTime() ?? 0) - (a.criadoEm?.getTime() ?? 0));

  return lista;
}
