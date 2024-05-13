import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { CreatePokemonDto } from './dtos/create-pokemon.dto';
import { UpdatePokemonDto } from './dtos/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { PaginationDTO } from 'src/common/dtos/pagination.dto';

@Injectable()
export class PokemonService {
  // Variable que almacenará el valor de 'defaultLimit' 
  private readonly defaultLimit: number;

  // Inyección de dependencias
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    // Para poder utilizar las variables de entorno en este servicio
    private readonly configService: ConfigService
  ) { 
    // Mostrando valores de variables de entorno
    console.log(process.env.DEFAULT_LIMIT);

    // Almacenará el valor de la variable de entorno 'DEFAULT_LIMIT', y si no existe esta, utilizará el valor por defecto
    this.defaultLimit = this.configService.get<number>('defaultLimit');
  }

  async create(createPokemonDto: CreatePokemonDto) {
    // Convertir a minúscula 
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase();

    try {
      // Insertando el nuevo Pokemon en la B.D
      const newPokemon = await this.pokemonModel.create(createPokemonDto);

      return newPokemon;
    } catch (error) {
      // Invocando el método para manejar las excepciones de errores
      this.handleExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDTO) {
    // Desestructurando PaginationDTO e inicializándolos
    const { limit = this.defaultLimit, offset = 0 } = paginationDto;

    // Traer todos los Pokemons o los que pasen el filtro pasado
    const pokemons = await this.pokemonModel.find()
      .limit(limit)
      .skip(offset)
      .sort({
        no: 1
      })
      .select('-__v');

    return pokemons;
  }

  async findOne(term: string) {
    /* Traer un pokemon por su 'ObjectId', 'name' o 'no' */

    let pokemon: Pokemon;

    // Chequear si el parámetro es un número...
    if (!isNaN(+term)) {
      // Se trabajará con los valores que coincidan con la propiedad 'no'
      pokemon = await this.pokemonModel.findOne({ no: +term });
    }

    // Chequear si el parámetro es un ObjectId...
    if (!pokemon && isValidObjectId(term)) {
      // Se trabajará con los valores que coincidan con el ObjectId
      pokemon = await this.pokemonModel.findById(term);
    }

    // Chequear si el parámetro es un valor de la propiedad 'name'...
    if (!pokemon) {
      // Si no se lo encontró por el ObjectId, ni el 'no', trabajar con el 'name'
      pokemon = await this.pokemonModel.findOne({ name: term.toLocaleLowerCase().trim() });
    }

    // Si el Pokemon no existe...
    if (!pokemon)
      throw new NotFoundException(`Pokemon with id, name or no: ${term} not found.`);

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    // Intentar traer el Pokemon por su 'name', 'no' u 'ObjectId'
    const pokemon = await this.findOne(term);

    try {
      // Pasar a minúscula el valor de 'name' (si es que se lo pasa)
      if (updatePokemonDto.name)
        updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();

      // Actualizar el Pokemon
      await pokemon.updateOne(updatePokemonDto/* , { new: true } */);

      // Retornar el pokemon actualizado (al sobreescribir los datos del 'updatePokemonDto')
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      // Invocando el método para manejar las excepciones de errores
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    // Chequear si se eliminó o no el Pokemon
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });

    // Si no se lo eliminó (no se encontró el ID)
    if (deletedCount === 0)
      // Arrojar el siguiente error
      throw new BadRequestException(`Pokemon with id ${id} not found`);

    return true;
  }

  /* Métodos extras aplicables a los del CRUD */

  // Método para manejar las excepciones al crear o actualizar un Pokemon
  // Excepciones no-controladas
  private handleExceptions(error: any) {
    // Chequear si el error proviene de intentar crear o actualizar un Pokemon con datos que ya existen en la B.D
    if (error.code === 11000)
      throw new BadRequestException(`Pokemon exists in DB ${JSON.stringify(error.keyValue)}`);

    // Si es por otros errores...
    console.log(error)
    throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`);
  }
}
