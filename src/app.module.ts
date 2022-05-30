import { Module } from '@nestjs/common'
import { GamesModule } from './games/games.module'
import { APP_FILTER } from '@nestjs/core'
import { AllExceptionsFilter } from './utils/all-expections.filter'
import { ScheduleModule } from '@nestjs/schedule'

@Module({
  imports: [
    ScheduleModule.forRoot(),
    GamesModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule { }
