import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
// Pipe para chequear que el 'ID' sea un 'ObjectID'
export class ParseMongoIdPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    console.log({ value, metadata });

    // Chequear que 'value' sea un 'ObjectId'.
    if (!isValidObjectId(value))
      // Si no lo es, arrojar el siguiente error...
      throw new BadRequestException(`${value} is not a valid MongoID`);

    return value;
  }
}
