import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Ez a régi, maradjon meg tesztnek
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // EZ AZ ÚJ RÉSZ:
  @Post('koszonj')
  koszonj(@Body() adatok: { nev: string }): string {
    return `Szia ${adatok.nev}! Üdvözöllek a NestJS szerverről!`;
  }
}
