import { Publisher } from './publisher-validation.dto'

export class UpdateGameDto {
  id: number
  title: string
  price: number
  releaseDate: Date
  tags: string[]
  publisher: Publisher
}
