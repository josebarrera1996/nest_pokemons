import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvConfiguration } from './config/app.config';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { JoiValidationSchema } from './config/joi.validation';

@Module({
    // Lista de módulos requeridos en este módulo
    imports: [
        // Cargando 'ConfigModule' para habilitar las variables de entorno
        ConfigModule.forRoot({
            // Cargando la siguiente configuración sobre las variables de entorno
            load: [EnvConfiguration],
            // Cargando el Schema de validación especificado
            validationSchema: JoiValidationSchema
        }),
        // Cargando contenido estático de 'public'
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public')
        }),
        // Cargando el módulo para utilizar 'Mongoose' en la app
        MongooseModule.forRoot(process.env.MONGO_URI, {
            dbName: process.env.MONGO_DB
        }),
        PokemonModule,
        CommonModule,
        SeedModule,
    ],
    // Lista de controladores que deben de ser instanciados por este módulo
    controllers: [],
    // Lista de los providers que serán instanciados por el inyector de Nest
    providers: [],
    // LIsta de los providers que serán exportados y por lo tanto, utilizados por otros módulos
    exports: []
})
export class AppModule {
    constructor() {
        // Variables de entorno corriendo en la aplicación
        // Por defecto no cargará las que están definidas en '.env'
        // console.log(process.env);
    }
}
