import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.use(Logger); global middleware-> for all the routes 
  await app.listen(process.env.PORT ?? 4500);
}
bootstrap();
