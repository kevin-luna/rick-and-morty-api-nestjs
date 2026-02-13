import { Injectable } from '@nestjs/common';
import { CharacterPage, PageInfo, Character } from './characters.dto';
import {fetchJSON} from '../utils'

@Injectable()
export class CharactersRepository {
  async getAliveCharactersPage(page: number): Promise<CharacterPage> {
      try{
        return await fetchJSON(`https://rickandmortyapi.com/api/character/?status=alive&page=${page}`);
      }catch{
        throw new Error('Connection error')
      }
  }
}