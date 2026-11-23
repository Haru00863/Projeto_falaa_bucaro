import { bancoDeDados } from "@/firebase-config";
import { TipoOcorrencia } from "@/types/ocorrencia";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

// Dados que a tela precisa informar para criar um reporte.
// Os campos `status` e `criadoEm` não aparecem aqui de propósito: quem define
// o valor deles é o serviço, para a tela não conseguir gravar valores errados.
export type DadosDoReporte = {
  idNotificante: string; // uid de quem está reportando (precisa ser o usuário logado, senão a regra do Firestore recusa)
  titulo: string;
  descricao: string;
  latitude: number;
  longitude: number;
  tipo: TipoOcorrencia; // buraco, calçada, iluminação ou outro
  endereco: string | null; // null quando não foi possível descobrir o endereço
};

/**
 * Grava um reporte na coleção "ocorrencias" e devolve o id do documento criado.
 *
 * `addDoc` (diferente de `setDoc`) deixa o Firestore gerar o id do documento
 * automaticamente. Como o serviço fica separado da tela, a tela só chama
 * `criarReporte` e não precisa conhecer detalhes do banco.
 */
export async function criarReporte(dados: DadosDoReporte): Promise<string> {
  const documento = await addDoc(collection(bancoDeDados, "ocorrencias"), {
    idNotificante: dados.idNotificante,
    titulo: dados.titulo.trim(),
    // Descrição é opcional: se vier vazia, gravamos null em vez de "" (o
    // Firestore não aceita `undefined`, por isso não usamos `undefined` aqui).
    descricao: dados.descricao.trim() || null,
    tipo: dados.tipo,
    endereco: dados.endereco, // string ou null (nunca undefined, pelo mesmo motivo da descrição)
    status: "aberto", // todo reporte novo começa como "aberto"
    latitude: dados.latitude,
    longitude: dados.longitude,
    criadoEm: serverTimestamp(), // horário do servidor do Firebase (não depende do relógio do celular)
  });

  return documento.id;
}
