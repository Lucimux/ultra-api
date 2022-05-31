import { Module } from '@nestjs/common'
import { GamesModule } from './games/games.module'
import { ScheduleModule } from '@nestjs/schedule'

@Module({
  imports: [ScheduleModule.forRoot(), GamesModule],
  providers: [],
})
export class AppModule {}
