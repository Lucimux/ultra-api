import { Controller } from '@nestjs/common'
import { GamesService } from './games.service'
import { CreateGameDto, FindOneDto, UpdateGameDto } from './dto'
import { MessagePattern } from '@nestjs/microservices'

@Controller()
export class GamesController {
  constructor(private readonly gamesService: GamesService) { }

  @MessagePattern('update')
  update(updateGameDto: UpdateGameDto) {
    return this.gamesService.update(updateGameDto)
  }

  @MessagePattern('remove')
  remove(id: number) {
    return this.gamesService.remove(id)
  }

  @MessagePattern('create')
  create(createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto)
  }

  @MessagePattern('findAll')
  findAll() {
    return this.gamesService.findAll()
  }

  @MessagePattern('findOne')
  findOne(findOneDto: FindOneDto) {
    return this.gamesService.findOne(findOneDto)
  }


}
