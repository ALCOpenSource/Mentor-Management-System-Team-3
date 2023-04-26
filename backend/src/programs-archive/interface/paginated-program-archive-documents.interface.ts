import { ProgramArchiveDocument } from "./../programs-archive.schema";

export interface PaginatedProgramArchiveDocuments {
  docs: ProgramArchiveDocument[];
  count: number;
}
