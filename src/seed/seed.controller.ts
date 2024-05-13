import { Controller, Post } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  // Inyección de dependencias
  constructor(private readonly seedService: SeedService) { }

  @Post()
  populateDB() {
    return this.seedService.executeSeed();
  }
}
