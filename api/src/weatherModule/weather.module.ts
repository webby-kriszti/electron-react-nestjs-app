import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}
