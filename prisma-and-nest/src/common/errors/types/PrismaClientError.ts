import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export type PrismaClientErro = PrismaClientKnownRequestError & {
  meta?: { target: string };
};
