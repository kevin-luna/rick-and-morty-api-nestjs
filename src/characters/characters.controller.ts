import {Controller, Get, Query} from '@nestjs/common'
import { CharactersService } from './characters.service'

@Controller({})
export class CharactersController{
    charactersService: CharactersService;

    constructor(charactersService: CharactersService){
        this.charactersService = charactersService;
    }

    @Get('characters/')
    async getCharacters(@Query('page') page: number){
        const response = await this.charactersService.getAliveCharactersFormatted(page);
        console.log(response)
        return response
    }

}