import { Controller, Get, Body, Post } from '@nestjs/common';
import { WeatherService, WeatherData } from './weather.service';
@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}
  @Get('measurements')
  getSavedData(): WeatherData[] {
    return this.weatherService.getSavedDatas();
  }
  @Post('frequency')
  setFrequeny(@Body('freq') freq: number): string {
    return this.weatherService.setFrequency(freq);
  }
}
