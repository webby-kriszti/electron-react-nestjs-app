import { Injectable } from '@nestjs/common';
export type WeatherData = {
  id: number;
  time: Date;
  temperature: number;
  humidity: number;
};

@Injectable()
export class WeatherService {
  getSavedDatas(): WeatherData[] {
    return [
      {
        id: 1,
        time: new Date(),
        temperature: 34,
        humidity: 50,
      },
    ];
  }
  setFrequency(freq: number): string {
    return `Frequency set to ${freq} seconds`;
  }
}
