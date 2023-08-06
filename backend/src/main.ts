import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe, VersioningType } from '@nestjs/common'

async function bootstrap() {
  const validationPipe = new ValidationPipe({
    transform: true,
  })
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(validationPipe)
  app.enableVersioning({ type: VersioningType.URI })
  app.enableCors({ origin: '*' })

  await app.listen(3000)
}
bootstrap()
