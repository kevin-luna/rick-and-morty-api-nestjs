import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('CharactersController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule =
        await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    afterAll(async () => {
        await app.close();
    });


    it('output formatting is correct', async () => {

        const response = await request(app.getHttpServer())
        .get('/characters?page=1').expect(200);

        expect(response.body).toHaveProperty('results');
        
        response.body.results.forEach(element => {
            expect(element).toHaveProperty('id');
            expect(element).toHaveProperty('name');
            expect(element).toHaveProperty('status');
            expect(typeof element.id).toBe('number');
            expect(typeof element.name).toBe('string');
            expect(typeof element.status).toBe('string');
            expect(element.status).toEqual('Alive')
            expect(element.name).not.toContain(' ')
        });
    
    });

});
