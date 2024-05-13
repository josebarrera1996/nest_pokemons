import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapters/axios.adapter';

@Module({
    // Lista de los providers que serán instanciados por el inyector de Nest
    providers: [AxiosAdapter],
    // Lista de los providers que son proveídos por este módulo y que pueden ser utilizados por otros
    exports: [AxiosAdapter],
})
export class CommonModule {}
