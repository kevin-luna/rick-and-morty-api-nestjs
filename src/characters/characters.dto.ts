export interface PageInfo {
  count: number;
  pages: number;
  next: string;
  prev: string;
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: object;
  location: object;
  image: string;
  episode: Array<string>;
  url: string;
  created: string;
}

export interface CharacterPage {
  info: PageInfo;
  results: Array<Character>;
}

export interface CharactersResponse {
    results: Array<Object>;
}