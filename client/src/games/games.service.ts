import { Injectable } from '@nestjs/common'
import { CreateGameDto, UpdateGameDto } from './dto'
import { Game } from './entities/game.entity'
import {
  ClientProxyFactory,
  Transport,
  ClientProxy
} from '@nestjs/microservices'

@Injectable()
export class GamesService {
  private readonly client: ClientProxy

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        port: 8000
      }
    })
  }

  create(createGame: CreateGameDto) {
    return this.client.send<Game, CreateGameDto>('create', createGame)
  }

  findAll() {
    return this.client.send<Game[]>('findAll', {})
  }

  findOne(id: number, getOnlyPublisher: boolean) {
    return this.client.send<Game>('findOne', { id, getOnlyPublisher })
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    return this.client.send<boolean>('update', { id, ...updateGameDto })
  }

  remove(id: number) {
    return this.client.send<boolean, number>('remove', id)
  }
}
