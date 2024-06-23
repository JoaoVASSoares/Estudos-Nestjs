import { Injectable, NestInterceptor, ExecutionContext, CallHandler, UnauthorizedException } from "@nestjs/common";
import { Observable, catchError } from "rxjs";
import { UnouthorizedError } from "../types/UnauthorizedError";

@Injectable()
export class UnouthorizedInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        if (error instanceof UnouthorizedError) {
          throw new UnauthorizedException(error.message);
        } else {
          throw error;
        }
      }),
    );
  }
}
