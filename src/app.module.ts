import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharactersModule } from './characters/characters.module';
import { CharactersController } from './characters/characters.controller';
import { CharactersService } from './characters/characters.service';
import { CharactersRepository } from './characters/characters.repository';

@Module({
  imports: [CharactersModule],
  controllers: [AppController,CharactersController],
  providers: [AppService, CharactersService, CharactersRepository],
})
export class AppModule {}
