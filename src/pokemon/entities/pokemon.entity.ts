import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Pokemon extends Document {
    /* Definiendo las propiedades */

    @Prop({
        unique: true,
        index: true
    })
    name: string;

    @Prop({
        unique: true,
        index: true
    })
    // Nro para identificar a un pokemon
    no: number;
}

// Exportando el Schema
export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
