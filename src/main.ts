import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('\nApp running on port', process.env.PORT || 3000, '\n');
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
