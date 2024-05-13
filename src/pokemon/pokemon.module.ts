import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';

@Module({
  // Lista de módulos requeridos en este módulo
  imports: [
    // Cargando el ConfigModule (para poder acceder a los valores de las variables de entorno)
    ConfigModule,
    // Cargando el módulo de Mongoose 
    MongooseModule.forFeature([
      // Definiendo el Modelo
      {
        name: Pokemon.name,
        schema: PokemonSchema
      }
    ])
  ],
  // Lista de controladores que deben de ser instanciados por este módulo
  controllers: [PokemonController],
  // Lista de los providers que serán instanciados por el inyector de Nest
  providers: [PokemonService],
  // Lista de los providers que pueden ser utilizados por otros módulos de la app
  exports: [MongooseModule]
})
export class PokemonModule { }
