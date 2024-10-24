import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { UnouthorizedInterceptor } from "./common/errors/interceptors/unauthorized.interceptor";
import { NotFoundInterceptor } from "./common/errors/interceptors/notfound.interceptor";
import { DatabaseInterceptor } from "./common/errors/interceptors/database.interceptor";
import { ConflictIntercptor } from "./common/errors/interceptors/conflict.interceptor";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder().setTitle("Simple blog").setDescription("The Simple Blog API description").setVersion("1.0").build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
  app.useGlobalInterceptors(
    new ConflictIntercptor(),
    new DatabaseInterceptor(),
    new UnouthorizedInterceptor(),
    new NotFoundInterceptor(),
    new DatabaseInterceptor(),
  );

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
