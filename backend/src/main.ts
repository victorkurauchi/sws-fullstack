import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // for our purpose...
  app.enableCors();
  const options = new DocumentBuilder()
    .setTitle('SWS Companies API')
    .setDescription('Retrieve companies information')
    .setVersion('1.0')
    .addTag('companies')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
