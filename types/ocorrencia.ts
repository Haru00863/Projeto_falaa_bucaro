export type StatusOcorrencia = "aberto" | "em_execucao" | "resolvido";

// Tipos de problema que o cidadão escolhe ao reportar (Desafio 1, extra).
// Os valores não têm acento porque são gravados no Firestore como identificadores;
// o texto bonito para a tela fica em constants/tipos.ts.
export type TipoOcorrencia = "buraco" | "calcada" | "iluminacao" | "outro";

export type Ocorrencia = {
  id: string;
  titulo: string;
  descricao?: string;
  status: StatusOcorrencia;
  latitude: number;
  longitude: number;
  // Campos acrescentados nos desafios extras. São opcionais porque os reportes
  // criados antes deles não têm esses campos no Firestore.
  tipo?: TipoOcorrencia;
  endereco?: string;
  criadoEm?: Date; // convertido do Timestamp do Firestore com .toDate()
  idNotificante?: string; // uid de quem criou o reporte
};
