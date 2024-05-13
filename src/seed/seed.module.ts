import { Module } from '@nestjs/common';
import { PokemonModule } from 'src/pokemon/pokemon.module';
import { CommonModule } from 'src/common/common.module';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';

@Module({
  // Lista de módulos requeridos en este módulo
  imports: [PokemonModule, CommonModule],
  // Lista de controladores que deben de ser instanciados por este módulo
  controllers: [SeedController],
  // Lista de los providers que serán instanciados por el inyector de Nest
  providers: [SeedService]
})
export class SeedModule {}
