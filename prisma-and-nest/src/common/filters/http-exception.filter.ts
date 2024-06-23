import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { timeStamp } from "console";
import { Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const exceptionReponse = exception.getResponse();

    const error = typeof response === "string" ? { message: exceptionReponse } : (exceptionReponse as Object);

    response.status(status).json({
      ...error,
      timestamp: new Date().toISOString(),
    });
  }
}
