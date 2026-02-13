import { Test, TestingModule } from '@nestjs/testing';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';

describe('CharactersController', () => {
  let controller: CharactersController;

  const mockService = {
    getAliveCharactersFormatted: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharactersController],
      providers: [
        {
          provide: CharactersService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<CharactersController>(CharactersController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return formatted characters', async () => {
    const mockResponse = {
      results: [
        { id: 1, name: 'Rick_Sanchez', status: 'Alive' },
      ],
    };

    mockService.getAliveCharactersFormatted.mockResolvedValue(
      mockResponse,
    );

    const result = await controller.getCharacters(1);

    expect(mockService.getAliveCharactersFormatted)
      .toHaveBeenCalledWith(1);

    expect(result).toEqual(mockResponse);
  });

  it('should throw if service fails', async () => {
    mockService.getAliveCharactersFormatted.mockRejectedValue(
      new Error('Service error'),
    );

    await expect(
      controller.getCharacters(1),
    ).rejects.toThrow('Service error');
  });
});
