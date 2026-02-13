import { CharactersRepository } from './characters.repository';
import { CharactersController } from './characters.controller';
import * as fetchModule from '../utils';

describe('CharactersRepository', () => {
  let repository: CharactersRepository;

  beforeEach(async () => {
    repository = new CharactersRepository;
  });

  afterEach(
    () => {
        jest.clearAllMocks();
    }
  );

  it('should call fetchJSON with correct URL', async () => {
    const mockData = {
      results: [{ id: 1, name: 'Rick', status: 'Alive' }],
    };

    jest.spyOn(fetchModule, 'fetchJSON').mockResolvedValue(mockData);

    const result = await repository.getAliveCharactersPage(1);

    expect(fetchModule.fetchJSON).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character/?status=alive&page=1',
    );

    expect(result).toEqual(mockData);
  });

  it('should return initialized page if fetch fails', async () => {
    jest
      .spyOn(fetchModule, 'fetchJSON')
      .mockResolvedValue(
        {
          info: {
            count: 0,
            pages: 0,
            next: '',
            prev: ''
          },
          results: []
        }
      );

    let result = await repository.getAliveCharactersPage(-1); 

    await expect(result.info.prev).toEqual('');
  });
});
