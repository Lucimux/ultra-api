import { Publisher } from './publisher-validation.dto'

export class CreateGameDto {
  title: string
  price: number
  releaseDate: Date
  tags: string[]
  publisher: Publisher
}
