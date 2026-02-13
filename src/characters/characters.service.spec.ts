import { Test, TestingModule } from '@nestjs/testing';
import { CharactersService } from './characters.service';
import { CharactersRepository } from './characters.repository';
import { CharactersController } from './characters.controller';

describe('CharactersService', () => {
  let service: CharactersService;

  const mockRepository = {
    getAliveCharactersPage: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharactersController],
      providers: [
        CharactersService,
        {
        provide: CharactersRepository,
        useValue: mockRepository
      }],
    }).compile();

    service = module.get<CharactersService>(CharactersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CharactersService,
        {
          provide: CharactersRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CharactersService>(CharactersService);
  });

  afterEach(
    () => {
      jest.clearAllMocks();
    }
  );

  it('should have id, name and status properties only', async () => {
    const mockData = {
      info: {},
      results: [
        {
          id: 17,
          name: 'Annie',
          status: 'Alive'
        }
      ],
    };
    mockRepository.getAliveCharactersPage.mockResolvedValue(mockData);

    const result = await service.getAliveCharactersFormatted(1);

    expect(result.results[0]).toHaveProperty('id');
    expect(result.results[0]).toHaveProperty('name');
    expect(result.results[0]).toHaveProperty('status');
    expect(result.results[0]).not.toHaveProperty('species');
    expect(result.results[0]).not.toHaveProperty('type');
    expect(result.results[0]).not.toHaveProperty('gender');
    expect(result.results[0]).not.toHaveProperty('origin');
    expect(result.results[0]).not.toHaveProperty('location');
    expect(result.results[0]).not.toHaveProperty('image');
    expect(result.results[0]).not.toHaveProperty('episode');
    expect(result.results[0]).not.toHaveProperty('url');
    expect(result.results[0]).not.toHaveProperty('created');
  });

  it('should replace spaces with underscores', async () => {
    const mockData = {
      info: {},
      results: [
        { id: 1, name: 'Rick Sanchez' },
        { id: 1, name: ' Abadango       Cluster    Princess ' },
      ],
    };
    mockRepository.getAliveCharactersPage.mockResolvedValue(mockData);

    const result = await service.getAliveCharactersFormatted(1);

    expect(result.results[0].name).toBe('Rick_Sanchez');
    expect(result.results[1].name).toBe('_Abadango_______Cluster____Princess_');
    expect(mockRepository.getAliveCharactersPage).toHaveBeenCalledWith(1);
  });

  it('should not change names without spaces', async () => {
    const mockData = {
      info: {},
      results: [
        {
          id: 17,
          name: 'Annie',
          status: 'Alive'
        }
      ],
    };
    mockRepository.getAliveCharactersPage.mockResolvedValue(mockData);

    const result = await service.getAliveCharactersFormatted(1);

    expect(result.results[0].name).toBe('Annie');
    expect(mockRepository.getAliveCharactersPage).toHaveBeenCalledWith(1);
  });

  it('should return empty array if no results', async () => {
    const mockData = {
      info: {},
      results: [],
    };
    mockRepository.getAliveCharactersPage.mockResolvedValue(mockData);

    const result = await service.getAliveCharactersFormatted(1);

    expect(result.results).toEqual([]);
  });


});
