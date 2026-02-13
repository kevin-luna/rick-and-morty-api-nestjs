import { Injectable } from '@nestjs/common';
import { CharacterPage, PageInfo, Character } from './characters.dto';
import {fetchJSON} from '../utils'

@Injectable()
export class CharactersRepository {
  async getAliveCharactersPage(page: number): Promise<CharacterPage> {
      try{
        return await fetchJSON(`https://rickandmortyapi.com/api/character/?status=alive&page=${page}`);
      }catch{
        return {
          info: {
            count: 0,
            pages: 0,
            next: '',
            prev: ''
          },
          results: []
        }
      }
  }
}