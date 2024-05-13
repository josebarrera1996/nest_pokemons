import { IsNumber, IsOptional, IsPositive, Min } from "class-validator"

// DTO para manejar los query params respectivos de la paginación
export class PaginationDTO {
    // Definiendo las propiedades que simbolizarán los Query Params para la paginación
    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Min(1)
    limit?: number

    @IsOptional()
    @IsNumber()
    @IsPositive()
    offset?: number
}