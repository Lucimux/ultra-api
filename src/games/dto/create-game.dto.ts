import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDateString,
  IsArray,
  ValidateNested
} from 'class-validator'
import { Type } from 'class-transformer'
import { Publisher } from './publisher-validation.dto'

export class CreateGameDto {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsNumber()
  price: number

  @IsNotEmpty()
  @IsDateString()
  releaseDate: Date

  @IsNotEmpty()
  @IsArray()
  tags: string[]

  @ValidateNested()
  @Type(() => Publisher)
  publisher: Publisher
}
