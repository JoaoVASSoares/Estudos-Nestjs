import { DatabaseErros } from "../types/DatabaseErrors";
import { PrismaClientErro } from "../types/PrismaClientError";
import { UniqueConstraintError } from "../types/UniqueConstraintError";

enum PrismaErrors {
  UniqueConstraintFail = "P2002",
}

export const handleDatabaseErrors = (e: PrismaClientErro): Error => {
  switch (e.code) {
    case PrismaErrors.UniqueConstraintFail:
      return new UniqueConstraintError(e);

    default: 
      return new DatabaseErros(e.message);
  }
};
