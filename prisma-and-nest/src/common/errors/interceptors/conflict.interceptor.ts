import { Injectable, NestInterceptor, ExecutionContext, CallHandler, UnauthorizedException, NotFoundException, ConflictException } from "@nestjs/common";
import { Observable, catchError } from "rxjs";
import { ConflictError } from "../types/ConflictError";

@Injectable()
export class ConflictIntercptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        if (error instanceof ConflictError) {
          throw new ConflictException(error.message);
        } else {
          throw error;
        }
      }),
    );
  }
}
