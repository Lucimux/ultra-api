import {
    IsString,
    IsNumber,
    IsDateString,
    IsArray,
    ValidateNested,
    IsOptional
} from 'class-validator'
import { PartialType } from '@nestjs/mapped-types'
import { CreateGameDto } from './create-game.dto'
import { Type } from 'class-transformer'
import { Publisher } from './publisher-validation.dto'

export class UpdateGameDto extends PartialType(CreateGameDto) {
    @IsOptional()
    @IsString()
    title: string

    @IsOptional()
    @IsNumber()
    price: number

    @IsOptional()
    @IsDateString()
    releaseDate: Date

    @IsOptional()
    @IsArray()
    tags: string[]

    @IsOptional()
    @ValidateNested()
    @Type(() => Publisher)
    publisher: Publisher
}
