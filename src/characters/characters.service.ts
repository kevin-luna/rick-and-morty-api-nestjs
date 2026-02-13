import { Injectable } from '@nestjs/common';
import { CharactersResponse } from './characters.dto';
import { CharactersRepository } from './characters.repository';

@Injectable()
export class CharactersService {

  charactersRepository:CharactersRepository;

  constructor(charactersRepository: CharactersRepository){
      this.charactersRepository = charactersRepository;
  }

  async getAliveCharactersFormatted(page: number): Promise<CharactersResponse>{
    const characters = await this.charactersRepository.getAliveCharactersPage(page);
    return {
      results: characters.results.map((character)=> (
        {
          id: character.id,
          name: character.name.replaceAll(' ','_'),
          status: character.status
        }
      ))
    }
  }

}
