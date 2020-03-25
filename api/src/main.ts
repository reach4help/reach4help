import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('API template')
    .setDescription('This is an API template')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  // Heroku send PORT
  await app.listen(parseInt((process.env.PORT || process.env.API_PORT), 10));
}

bootstrap()
  .then(() => {
    console.log('Bootstrap Completed')
  })
  .catch((error) => {
    console.log('FATAL ERROR', error);
    process.exit(1)
  });
