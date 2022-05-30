import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { GamesService } from './games.service'
import { CreateGameDto, UpdateGameDto } from './dto'

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) { }

  @Post()
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto)
  }

  @Get()
  findAll() {
    return this.gamesService.findAll()
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('getOnlyPublisher') getOnlyPublisher: string
  ) {
    const game = this.gamesService.findOne(id, Boolean(getOnlyPublisher))
    if (!game) {
      throw new HttpException('Game not found', HttpStatus.BAD_REQUEST)
    }
    return game
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateGameDto: UpdateGameDto) {
    const isUpdated = this.gamesService.update(id, updateGameDto)
    if (!isUpdated) {
      throw new HttpException("Couldn't update game", HttpStatus.BAD_REQUEST)
    }
    return
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    const isDeleted = this.gamesService.remove(id)
    if (!isDeleted) {
      throw new HttpException("Couldn't delete game", HttpStatus.BAD_REQUEST)
    }
    return
  }
}
