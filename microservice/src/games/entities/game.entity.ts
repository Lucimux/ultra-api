import { Publisher } from './publisher.entity'

export class Game {
  readonly id: number
  readonly title: string
  readonly price: number
  readonly releaseDate: Date
  readonly tags: string[]
  readonly publisher: Publisher
}
