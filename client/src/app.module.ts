import { Module } from '@nestjs/common'
import { GamesModule } from './games/games.module'

@Module({
  imports: [GamesModule],
  providers: [],
})
export class AppModule {}
