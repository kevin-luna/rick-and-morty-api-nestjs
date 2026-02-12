import { Injectable } from '@nestjs/common';
import { Character, CharacterPage } from './characters.dto';
import { CharactersRepository } from './characters.repository';

@Injectable()
export class CharactersService {

  charactersRepository:CharactersRepository;

  constructor(charactersRepository: CharactersRepository){
      this.charactersRepository = charactersRepository;
  }

  async getAliveCharactersFormatted(){
    const allCharacters = await this.charactersRepository.getAllCharacters();
    return allCharacters.filter((character) => character.status=='alive').map((character)=> character.name.replaceAll(' ','_'))
  }

}
