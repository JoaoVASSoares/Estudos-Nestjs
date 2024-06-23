import { ConflictError } from "./ConflictError";
import { PrismaClientErro } from "./PrismaClientError";

export class UniqueConstraintError extends ConflictError {
  constructor(e: PrismaClientErro) {
    const uniqueField = e.meta.target;

    super(`A record with this ${uniqueField} already exists.`);
  }
}
