import {
    IsNotEmpty,
    IsString,
    IsNumber,
} from 'class-validator'

export class Publisher {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsNumber()
    siret: number

    @IsNotEmpty()
    @IsString()
    phone: string
}
