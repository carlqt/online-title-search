import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { SearchModule as V2SearchModule } from './v2/search/search.module'
import { SearchModule as V1SearchModule } from './v1/search/search.module'

@Module({
  imports: [V2SearchModule, V1SearchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
