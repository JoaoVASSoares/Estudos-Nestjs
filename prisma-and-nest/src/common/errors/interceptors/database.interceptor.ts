import { Injectable, NestInterceptor, ExecutionContext, CallHandler, UnauthorizedException, NotFoundException, BadRequestException } from "@nestjs/common";
import { Observable, catchError } from "rxjs";
import { isPrismaError } from "../utils/is-prism-error.util";
import { handleDatabaseErrors } from "../utils/handle-database-errors.util";
import { DatabaseErros } from "../types/DatabaseErrors";

@Injectable()
export class DatabaseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        if (isPrismaError(error)) {
          error = handleDatabaseErrors(error);
        }
        if (error instanceof DatabaseErros) {
          throw new BadRequestException(error.message);
        } else {
          throw error;
        }
      }),
    );
  }
}
