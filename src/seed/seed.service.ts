import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { PokeResponse } from './interfaces/poke-response.interface';
import { IPokemon } from './interfaces/pokemon.interface';

@Injectable()
export class SeedService {
  // Inyección de dependencias
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    private readonly http: AxiosAdapter
  ) { }

  async executeSeed() {
    // Eliminar los Pokemons de la B.D
    await this.pokemonModel.deleteMany();

    // Obteniendo los pokemons especificados. Se tipeará la respuesta con 'PokeResponse'
    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    // Arreglo de los Pokemons a insertar
    const pokemonToInsert: IPokemon[] = []; // { name: string, no: number }

    // Desestructurando 'results'
    data.results.forEach(({ name, url }) => {
      // Obtener el 'no' de los pokemons (que está dentro de url)
      const segments = url.split('/'); // Separo en segmentos 'url'
      const no: number = +segments[segments.length - 2]; // Obtengo el penúltimo segmento
      console.log({ name, no });

      // Insertando los Pokemons
      pokemonToInsert.push({ name, no });
    });

    // Insertar todos los Pokemons en la B.D en una sola vez
    await this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed executed :)';
  }
}
