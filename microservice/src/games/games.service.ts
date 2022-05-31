import { Injectable, Logger } from '@nestjs/common'
import { DISCOUNT, _12_MONTHS, _18_MONTHS } from 'src/utils/constants'
import { CreateGameDto, UpdateGameDto, FindOneDto } from './dto'
import { Game } from './entities/game.entity'
import { Cron } from '@nestjs/schedule'

@Injectable()
export class GamesService {
  private gamesArray = []
  private readonly logger = new Logger(GamesService.name)

  randomId() {
    return new Date().getTime()
  }

  create({ publisher, ...data }: CreateGameDto): Game {
    const newGame: Game = {
      ...data,
      id: this.randomId(),
      publisher: {
        id: this.randomId(),
        ...publisher,
      },
    }
    this.gamesArray = [...this.gamesArray, newGame]
    return newGame
  }

  findAll() {
    const games = this.gamesArray
    const count = games.length
    return {
      count,
      games,
    }
  }

  findOne({ id, getOnlyPublisher }: FindOneDto): Game {
    const getGame = this.gamesArray.find((item) => item.id === id)
    if (getGame && getOnlyPublisher) {
      return getGame.publisher
    }
    return getGame
  }

  update({ id, publisher, ...updateGameDto }: UpdateGameDto): boolean {
    const game = this.findOne({ id, getOnlyPublisher: false })
    if (!game) {
      return false
    }
    const gameIndex = this.gamesArray.findIndex((item) => item.id === id)
    this.gamesArray[gameIndex] = {
      ...this.gamesArray[gameIndex],
      ...updateGameDto,
      publisher: {
        ...this.gamesArray[gameIndex].publisher,
        ...publisher,
      },
    }
    return true
  }

  remove(id: number): boolean {
    const game = this.findOne({ id, getOnlyPublisher: false })
    if (!game) {
      return false
    }
    const newGamesArray = this.gamesArray.filter((item) => item.id !== id)
    this.gamesArray = newGamesArray
    return true
  }

  diffInDays(date: string) {
    const releaseDate = new Date(date).getTime()
    const currentDate = new Date().getTime()
    const diffTime = Math.abs(currentDate - releaseDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  @Cron('30 * * * * *')
  applyDiscount(): void {
    this.logger.debug('Applying discounts')
    const oldGames = this.gamesArray.filter(
      ({ releaseDate }) => this.diffInDays(releaseDate) >= _12_MONTHS && this.diffInDays(releaseDate) <= _18_MONTHS
    )
    oldGames.forEach(({ id, price }) => {
      const gameIndex = this.gamesArray.findIndex((item) => item.id === id)
      this.gamesArray[gameIndex] = {
        ...this.gamesArray[gameIndex],
        price: price - price * DISCOUNT,
      }
    })
    this.logger.debug(`${oldGames.length} discounts applied`)
  }

  @Cron('45 * * * * *')
  deleteOlder(): void {
    this.logger.debug('Deleting old games')
    const newGamesList = this.gamesArray.filter(({ releaseDate }) => this.diffInDays(releaseDate) < _18_MONTHS)
    this.gamesArray = newGamesList
  }
}
